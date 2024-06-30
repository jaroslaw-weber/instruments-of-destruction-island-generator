import _ from "lodash";
type Point3D = {
  x: number;
  y: number;
  z: number;
  handleIn?: Handle;
  handleOut?: Handle;
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

function generateRandomPoint3D(): Point3D {
  return {
    x: _.random(0, 100, true),
    y: 0,
    z: _.random(0, 100, true),
  };
}

function generateControlledRandomPoint3D(): Point3D {
  const baseX = _.random(0, 100, true);
  const baseZ = _.random(0, 100, true);
  // Using noise to add controlled randomness
  const noiseX = ((Math.sin(baseX) + 1) / 2) * 10; // Sin noise for more natural variation
  const noiseZ = ((Math.cos(baseZ) + 1) / 2) * 10; // Cos noise for more natural variation
  return {
    x: baseX + noiseX,
    y: 0,
    z: baseZ + noiseZ,
  };
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

function generateCircularPoints(
  count: number,
  radius: number,
  offsetX: number,
  offsetZ: number
): Point3D[] {
  const points: Point3D[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * 2 * Math.PI;
    points.push({
      x: radius * Math.cos(angle) + offsetX,
      y: 0,
      z: radius * Math.sin(angle) + offsetZ,
    });
  }
  return points;
}

type Handle = { x: number; y: number; z: number };
type Point3DWithHandles = Point3D & { handleIn?: Handle; handleOut?: Handle };

function generateHandles(points: Point3D[]): Point3DWithHandles[] {
  return points.map((point, index, array) => {
    let handleOut: Handle | undefined = undefined;

    if (index < array.length - 1) {
      const nextPoint = array[index + 1];
      // Calculate direction vector from current point to next
      const direction = {
        x: nextPoint.x - point.x,
        y: nextPoint.y - point.y,  // Normally 0 in your case, as y is consistently 0
        z: nextPoint.z - point.z,
      };
      // Calculate handle length as a fraction of the distance to the next point
      const length = Math.sqrt(direction.x ** 2 + direction.z ** 2) * 0.3; // 30% of the distance
      // Normalize the direction vector
      const norm = Math.sqrt(direction.x ** 2 + direction.z ** 2);
      direction.x /= norm;
      direction.z /= norm;
      // Set the handle out
      handleOut = {
        x: point.x + direction.x * length,
        y: 0,
        z: point.z + direction.z * length,
      };
    }

    // For symmetrical handles, the handle in is just the negative of handle out of the previous point
    const handleIn = index > 0 ? {
      x: 2 * point.x - array[index - 1].handleOut!.x,
      y: 0,
      z: 2 * point.z - array[index - 1].handleOut!.z,
    } : undefined;

    return { ...point, handleIn, handleOut };
  });
}function generateYValueForSlope(x: number, z: number, slope: number): number {
  // Example slope function: y = slope * (x + z)
  // You can modify this to get different types of slopes
  return slope * (x + z);
}



export function generateTerrainConfig(
  shape: "circle" | "ditto", idx: number
): TerrainConfig {
  const pointsCount = _.random(6, 12);
  const offsetX = _.random(-200, 200);
  const offsetZ = _.random(-200, 200);
  let points: Point3D[];

  if (shape === "circle") {
    const radius = _.random(40, 60);
    points = generateCircularPoints(pointsCount, radius, offsetX, offsetZ);
  } else {
    const width = _.random(80, 120);
    const height = _.random(40, 60);
    points = generateDittoShapePoints(
      pointsCount,
      width,
      height,
      offsetX,
      offsetZ
    );
  }

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
    m_handles:generateHandles(points),
    m_pts_disabled: _.times(pointsCount, () => false),
    m_point_info: [], //todo?
    m_loop_step: 0,
    m_bottom_fan_dist: 0,
    m_extrude_bottom: 3,
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
