import { useAtom } from "jotai";
import { buildingCountAtom, structuresAtom } from "../state";
import React from "react";
import { getRandomStructures } from "../generate";
function StructureGenerator({}) {
  const [structures, setStructures] = useAtom(structuresAtom);
  const [buildingCount, setBuildingCount] = useAtom(buildingCountAtom);

  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold text-lg">Structures</p>
      <p>Density (how many buildings?):</p>
      <p>{buildingCount}</p>
      <input
        type="range"
        min={1}
        max={150}
        value={buildingCount}
        className="range"
        onChange={(e) => setBuildingCount(parseInt(e.target.value))}
      />
      <div className="flex gap-4 mt-4">
        {" "}
        <button
          className="btn btn-primary"
          onClick={() => setStructures(getRandomStructures(buildingCount))}
        >
          generate!
        </button>
        <button className="btn" onClick={() => setStructures([])}>
          clear
        </button>
      </div>
    </div>
  );
}

export default StructureGenerator;
