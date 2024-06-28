"use client";
import { useAtom } from "jotai";
import Image from "next/image";
import { structuresAtom } from "./state";
import FileUpload from "./components/FileUpload";
import { getRandomStructures } from "./generate";
import FileSave from "./components/FileSave";
import IslandPreview from "./components/IslandPreview";
export default function Home() {
  const [structures, setStructures] = useAtom(structuresAtom);

  const simplifiedStructures = structures.map((s) => ({
    position: s.position,
    esr_type: {
      bi_name: s.esr_type.bi_name,
    },
  }));

  return (
    <>
      <FileUpload />
      <FileSave/>
      <button className="btn btn-primary" onClick={() => setStructures([])}>
        Clear
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => setStructures(getRandomStructures(60))}
      >
        Randomize
      </button>
      <IslandPreview/>
      <pre>{JSON.stringify(simplifiedStructures, null, 2)}</pre>
    </>
  );
}
