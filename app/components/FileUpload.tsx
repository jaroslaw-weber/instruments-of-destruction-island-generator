import { useAtom } from "jotai";
import { islandAtom, structuresAtom } from "../state";
import { Structure } from "../types";
import { uniq } from "lodash";

function FileUpload({}) {
  const [_structures, setStructures] = useAtom(structuresAtom);
  const [_island, setIsland] = useAtom(islandAtom);
  const handleFileUpload = (event:any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const island = JSON.parse(e.target?.result as string);
      const structures: Structure[] = island.m_structures;
      setStructures(structures);
      setIsland(island);
      console.log(
        JSON.stringify(uniq(structures.map((s) => s.esr_type.bi_name)))
      );
    };
    reader.readAsText(file);
  };

  return (
    <label className="flex flex-1 w-full h-full">
      <span className="btn rounded-r-none ">Upload Island File</span>
      <input
        type="file"
        className="file-input file-input-bordered [&::file-selector-button]:hidden p-2.5 rounded-l-none"
        onChange={handleFileUpload}
      />
    </label>
  );
}

export default FileUpload;
