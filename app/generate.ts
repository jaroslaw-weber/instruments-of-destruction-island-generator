import { random, sample } from "lodash";
import { Structure } from "./types";
import { structureDb } from "./structures";

export function getRandomStructures(structureCount: number, islandSize:number) {
  const result: Structure[] = new Array(structureCount).fill(0).map(x=>getRandomStructure(islandSize));
  return result;
}

function getRandomStructure(islandSize:number) {
  const structore = sample(structureDb)!;
  const structureType = structore.name;
  const id = random(10000, 100000);
  const result: Structure = {
    structure: {
      instanceID: id,
    },
    moveable: false,
    position: {
      x: random(-islandSize, islandSize),
      y: -16, //for some reason the ground is not 0
      z: random(-islandSize, islandSize),
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
