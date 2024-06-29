"use client";
import { useAtom } from "jotai";
import {
  buildingCountAtom,
  islandSizeAtom,
  structureSpacingAtom,
  structuresAtom,
} from "../state";
import React from "react";
import { getRandomStructures } from "../generate";

function StructureGenerator({}) {
  const [structures, setStructures] = useAtom(structuresAtom);
  const [buildingCount, setBuildingCount] = useAtom(buildingCountAtom);
  const [islandSize, setIslandSize] = useAtom(islandSizeAtom);
  const [structureSpacing, setStructureSpacing] = useAtom(structureSpacingAtom);

  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold text-lg">Structures</p>
      <div className="flex gap-4 my-4">
        {" "}
        <button
          className="btn btn-primary"
          onClick={() =>
            setStructures(
              getRandomStructures(buildingCount, islandSize, structureSpacing)
            )
          }
        >
          generate!
        </button>
        <button className="btn" onClick={() => setStructures([])}>
          clear
        </button>
      </div>
      <p className="font-bold">How many buildings?</p>
      <p>{buildingCount}</p>
      <input
        type="range"
        min={1}
        max={70}
        value={buildingCount}
        className="range"
        onChange={(e) => setBuildingCount(parseInt(e.target.value))}
      />
      <p className="font-bold">Island Size</p>
      <p>{islandSize}</p>
      <input
        type="range"
        min={30}
        max={500}
        value={islandSize}
        className="range"
        onChange={(e) => setIslandSize(parseInt(e.target.value))}
      />
      <p className="font-bold">Chaos/Order</p>
      <p>{structureSpacing}</p>
      <p>
        The bigger the value, the less chaotic the structure placement will be.
      </p>
      <input
        type="range"
        min={1}
        max={100}
        value={structureSpacing}
        className="range"
        onChange={(e) => setStructureSpacing(parseInt(e.target.value))}
      />
    </div>
  );
}

export default StructureGenerator;
