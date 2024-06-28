export interface Structure {
  structure: {
    instanceID: number;
  };
  moveable: false;
  position: {
    x: number;
    y: number;
    z: number;
  };
  y_rot: 0;
  uid: 15;
  joint_ids: [-1, -1, -1, 2, -1, -1, -1, -1];
  esr_type: {
    ref_type: 0;
    bi_type: 109;
    bi_name: string;
    local_name: string;
    ws_name: "";
    ws_id: 0;
  };
  damage_mod: 1.0;
}

export interface Island {
  m_structures: Structure[];
}
