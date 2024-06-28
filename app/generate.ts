import { random, sample } from "lodash";
import { Structure } from "./types";
import { structureDb } from "./structures";

export function getRandomStructures(structureCount: number, islandSize: number, spacing: number) {
  const gridSize = Math.ceil(islandSize * 2 / spacing);
  const result: Structure[] = [];

  for (let i = 0; i < structureCount; i++) {
    const row = random(0, gridSize - 1);
    const col = random(0, gridSize - 1);
    const { x, z } = getGridPosition(row, col, gridSize, spacing);
    result.push(getRandomStructure(islandSize, x, z));
  }

  return result;
}

function getGridPosition(row: number, col: number, gridSize: number, cellSize: number) {
  // Center the grid around (0,0)
  const centerX = (gridSize - 1) * cellSize / 2;
  const centerZ = (gridSize - 1) * cellSize / 2;

  const x = col * cellSize - centerX;
  const z = row * cellSize - centerZ;

  return { x, z };
}

function getRandomStructure(islandSize: number, x: number, z: number) {
  const structure = sample(structureDb)!; // Ensure this never returns undefined
  const id = random(10000, 100000);
  const result: Structure = {
    structure: {
      instanceID: id,
    },
    moveable: false,
    position: {
      x: x,
      y: -16, // Adjust if the ground level is not 0
      z: z,
    },
    y_rot: 0,
    uid: 15,
    joint_ids: [-1, -1, -1, 2, -1, -1, -1, -1],
    esr_type: {
      ref_type: 0,
      bi_type: 109,
      bi_name: structure.name,
      local_name: structure.name + "_" + id,
      ws_name: "",
      ws_id: 0,
    },
    damage_mod: 1.0,
  };

  return result;
}
