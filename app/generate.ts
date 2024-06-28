import { random, sample } from "lodash";
import { Structure } from "./types";
import { structureDb } from "./structures";

export function getRandomStructures(count: number) {
  const result: Structure[] = new Array(count).fill(0).map(getRandomStructure);
  return result;
}

function getRandomStructure() {
  const structore = sample(structureDb)!;
  const structureType = structore.name;
  const id = random(10000, 100000);
  const result: Structure = {
    structure: {
      instanceID: id,
    },
    moveable: false,
    position: {
      x: random(-400, 400),
      y: 0,
      z: random(-400, 400),
    },
    y_rot: 0,
    uid: 15,
    joint_ids: [-1, -1, -1, 2, -1, -1, -1, -1],
    esr_type: {
      ref_type: 0,
      bi_type: 109,
      bi_name: structureType,
      local_name: structureType + "_" + id,
      ws_name: "",
      ws_id: 0,
    },
    damage_mod: 1.0,
  };
  return result;
}
