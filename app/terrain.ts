import _ from 'lodash';

type Point3D = { x: number; y: number; z: number };
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
    z: _.random(0, 100, true)
  };
}

export function generateTerrainConfig(): TerrainConfig {
  const pointsCount = _.random(10, 20); // Generate between 10 and 20 points
  const points = _.times(pointsCount, generateRandomPoint3D);

  return {
    m_layer_idx: _.random(0, 4),
    m_path: _.sample([true, false])!,
    m_pathloop: _.sample([true, false])!,
    m_grass_mask: _.random(0, 255),
    m_rock_mask: _.random(0, 255),
    m_path_side_mask: _.random(0, 255),
    m_negate_range: _.random(0, 10, true),
    m_smooth_points: points,
    m_smooth_handles: [],
    m_smoothing_steps: _.random(1, 5),
    m_points: points,
    m_handles: [],
    m_pts_disabled: _.times(pointsCount, () => _.sample([true, false])!),
    m_point_info: [],
    m_loop_step: _.random(0, 5),
    m_bottom_fan_dist: _.random(1, 20),
    m_extrude_bottom: _.random(1, 10),
    m_extrude_profile: [{ x: _.random(0, 1, true), y: _.random(0, 1, true) }],
    m_profile_size: { x: _.random(0, 50, true), y: _.random(0, 5, true) },
    m_profile_noise: { x: _.random(0, 1, true), y: _.random(0, 1, true) },
    m_noise_affects_top: _.sample([true, false])!,
    m_custom_skew: { x: _.random(0, 1, true), y: _.random(0, 1, true) },
    m_edge_superfilter: _.random(0, 10),
    m_hidden_in_game: _.sample([true, false])!,
    m_slope: _.random(0, 30)
  };
}

