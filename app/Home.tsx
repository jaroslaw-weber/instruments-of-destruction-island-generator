"use client";
import { useAtom } from "jotai";
import {
  buildingCountAtom,
  islandSizeAtom,
  structureSpacingAtom,
  structuresAtom,
} from "./state";
import FileUpload from "./components/FileUpload";
import { getRandomStructures } from "./generate";
import FileSave from "./components/FileSave";
import IslandPreview from "./components/IslandPreview";

export default function Home() {
  const [structures, setStructures] = useAtom(structuresAtom);
  const [islandSize, setIslandSize] = useAtom(islandSizeAtom);
  const [buildingCount, setBuildingCount] = useAtom(buildingCountAtom);
  const [structureSpacing, setStructureSpacing] = useAtom(structureSpacingAtom);

  const simplifiedStructures = structures.map((s) => ({
    position: s.position,
    esr_type: {
      bi_name: s.esr_type.bi_name,
    },
  }));

  return (
    <div className="p-4 gap-8 max-w-3xl h-20 mx-auto">
      <div>
        <p className="font-bold text-lg">Structures</p>
        <div className="flex space-x-4">
          <button className="btn btn-primary" onClick={() => setStructures([])}>
            clear
          </button>
          <button
            className="btn btn-secondary"
            onClick={() =>
              setStructures(
                getRandomStructures(buildingCount, islandSize, structureSpacing)
              )
            }
          >
            randomize
          </button>
        </div>{" "}
        <p className="font-bold text-lg">Import / Export</p>
        <div className="flex justify-evenly items-center gap-6">
          <FileUpload />
          <FileSave />
        </div>
      </div>
      <p className="font-bold text-lg">Island Preview</p>
      <p className="py-6">Below you can see how the island will looks like:</p>
      <IslandPreview />
      <p className="font-bold text-lg">File Preview</p>
      <pre className="mockup-code whitespace-pre-wrap p-6">
        {JSON.stringify(simplifiedStructures, null, 2)}
      </pre>
    </div>
  );
}
