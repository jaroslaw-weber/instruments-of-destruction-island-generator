"use client";
import { useAtom } from "jotai";
import Image from "next/image";
import { structuresAtom } from "./state";
import FileUpload from "./components/FileUpload";
import { getRandomStructures } from "./generate";
import FileSave from "./components/FileSave";
import IslandPreview from "./components/IslandPreview";
import StructureGenerator from "./components/StructureGenerator";

export default function Home() {
  const [structures, setStructures] = useAtom(structuresAtom);

  const simplifiedStructures = structures.map((s) => ({
    position: s.position,
    esr_type: {
      bi_name: s.esr_type.bi_name,
    },
  }));

  return (
    <div className="p-4 space-y-4 max-w-3xl h-20 mx-auto">
      <p className="font-bold text-lg">Island Generator</p>
      <p>
        Generate random islands with structures for Instruments of Destruction
        game
      </p>
      <p className="font-bold text-lg">Import / Export</p>
      <p>
        First, load any map here to load terrain. Currently only support flat
        maps. Maps are saved in folder:
      </p>
      <pre className="mockup-code pl-4">C:\Users\USERNAME\AppData\LocalLow\Radiangames\Instruments\levels</pre>
      <div className="flex justify-evenly items-center gap-6">
        <FileUpload />
        <FileSave />
      </div>
      <StructureGenerator />
      <p className="font-bold text-lg">Island Preview</p>
      <p>Below you can see how the island will looks like:</p>
      <IslandPreview />
      <p className="font-bold text-lg">File Preview</p>
      <pre className="mockup-code whitespace-pre-wrap p-6">
        {JSON.stringify(simplifiedStructures, null, 2)}
      </pre>
    </div>
  );
}
