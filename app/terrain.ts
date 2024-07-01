import _, { cloneDeep } from "lodash";
type Point3D = {
  x: number;
  y: number;
  z: number;
};
type ProfilePoint = { x: number; y: number };

export interface TerrainConfig {
  m_layer_idx: number;
  m_path: boolean;
  m_pathloop: boolean;
  m_grass_mask: number;
  m_rock_mask: number;
  m_path_side_mask: number;
  m_negate_range: number;
  m_smooth_points: Point3D[];
  m_smooth_handles: any[];
  m_smoothing_steps: number;
  m_points: Point3D[];
  m_handles: any[];
  m_pts_disabled: boolean[];
  m_point_info: any[];
  m_loop_step: number;
  m_bottom_fan_dist: number;
  m_extrude_bottom: number;
  m_extrude_profile: ProfilePoint[];
  m_profile_size: { x: number; y: number };
  m_profile_noise: { x: number; y: number };
  m_noise_affects_top: boolean;
  m_custom_skew: { x: number; y: number };
  m_edge_superfilter: number;
  m_hidden_in_game: boolean;
  m_slope: number;
}

function generateSmoothPoints(points: Point3D[]): Point3D[] {
  if (points.length < 2) return points; // Not enough points to smooth
  return points.map((point, i, arr) => {
    if (i === 0 || i === arr.length - 1) return point; // Keep the ends
    const prev = arr[i - 1];
    const next = arr[i + 1];
    return {
      x: (prev.x + point.x + next.x) / 3,
      y: 0,
      z: (prev.z + point.z + next.z) / 3,
    };
  });
}

function generateDittoShapePoints(
  count: number,
  width: number,
  height: number,
  offsetX: number,
  offsetZ: number
): Point3D[] {
  const points: Point3D[] = [];
  const centerShift = width * 0.2;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * 2 * Math.PI;
    const xShift = Math.sin(angle * 4) * centerShift;
    points.push({
      x: width * 0.5 * Math.cos(angle) + xShift + offsetX,
      y: 0,
      z: height * 0.5 * Math.sin(angle) + offsetZ,
    });
  }
  return points;
}

function generateHandles(points: Point3D[]): any[] {
  // Handles are points used to control the shape of the curve.
  // We will create handles by offsetting the original points.

  return points.map((point, i, arr) => {
    // Create handles slightly offset from the original points.
    const offset = 5; // You can adjust this value as needed.

    // Handle before the point (control point)
    const prevHandle = {
      x: point.x - offset,
      y: point.y,
      z: point.z - offset,
    };

    // Handle after the point (control point)
    const nextHandle = {
      x: point.x + offset,
      y: point.y,
      z: point.z + offset,
    };

    return {
      prevHandle,
      point,
      nextHandle,
    };
  });
}

export function generateTerrainConfigV2(count: number): TerrainConfig[]{
  let preset:{m_loops: TerrainConfig[]} = require("./basic.json");
  
  const maxDeviation = 400; // Maximum deviation from the current point position

  for (const loop of preset.m_loops) {

    // Generate deviations within a limited range
    const deviationX = _.random(-maxDeviation, maxDeviation);
    const deviationZ = _.random(-maxDeviation, maxDeviation);

    for (const p of loop.m_points) {
      // Apply constrained deviations
      p.x += deviationX;
      p.z += deviationZ;
    }

    for (const p of loop.m_smooth_points) {
      // Apply constrained deviations
      p.x += deviationX;
      p.z += deviationZ;
    }
  }
  return preset.m_loops;
}


export function generateTerrainConfig(idx: number): TerrainConfig {
  const pointsCount = _.random(6, 12);
  const offsetX = _.random(-200, 200);
  const offsetZ = _.random(-200, 200);
  let points: Point3D[];

  const width = _.random(80, 120);
  const height = _.random(40, 60);
  points = generateDittoShapePoints(
    pointsCount,
    width,
    height,
    offsetX,
    offsetZ
  );

  const smoothPoints = generateSmoothPoints(points);

  return {
    m_layer_idx: idx,
    m_path: false,
    m_pathloop: false,
    m_grass_mask: _.random(4, 6),
    m_rock_mask: _.random(4, 6),
    m_path_side_mask: 0,
    m_negate_range: 0,
    m_smooth_points: smoothPoints,
    m_smooth_handles: generateHandles(smoothPoints),
    m_smoothing_steps: _.random(1, 5),
    m_points: points,
    m_handles: generateHandles(points),
    m_pts_disabled: _.times(pointsCount, () => false),
    m_point_info: [], //todo?
    m_loop_step: 0,
    m_bottom_fan_dist: 0,
    m_extrude_bottom: 30,
    m_extrude_profile: [
      {
        x: -1.0,
        y: 0.0,
      },
      {
        x: -0.4897997975349426,
        y: 0.15516029298305512,
      },
      {
        x: -0.15312622487545014,
        y: 0.34033066034317019,
      },
      {
        x: 0.17513000965118409,
        y: 0.6391282677650452,
      },
      {
        x: 0.47813597321510317,
        y: 0.8369238376617432,
      },
      {
        x: 0.9747290015220642,
        y: 1.0,
      },
    ],
    m_profile_size: {
      x: 60.0,
      y: 6.0,
    },
    m_profile_noise: {
      x: 0.0,
      y: 0.0,
    },
    m_noise_affects_top: false,
    m_custom_skew: {
      x: 0.0,
      y: 0.0,
    },
    m_edge_superfilter: 0,
    m_hidden_in_game: false,
    m_slope: 6,
  };
}
