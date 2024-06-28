import { useAtom } from "jotai";
import { islandAtom, structuresAtom } from "../state";
import { Structure } from "../types";
import { uniq} from "lodash";

function FileUpload({}) {
  const [_structures, setStructures] = useAtom(structuresAtom);
  const [_island, setIsland] = useAtom(islandAtom);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const island = JSON.parse(e.target.result);
	  const structures: Structure[] =island.m_structures
      setStructures(structures);
	  setIsland(island);
	  console.log(JSON.stringify(uniq(structures.map((s) => s.esr_type.bi_name))))
    };
    reader.readAsText(file);
  };

  return (
    <label className="btn btn-primary">
      Upload File
      <input type="file" className="hidden" onChange={handleFileUpload} />
    </label>
  );
}

export default FileUpload;
