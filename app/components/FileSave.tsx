import { useAtom } from "jotai";
import { islandAtom, structuresAtom } from "../state";
import { saveAs } from "file-saver";
import { v4 } from "uuid";

function FileSave() {
  const [structures] = useAtom(structuresAtom);
  const [island] = useAtom(islandAtom);
  const newIsland = {...island, m_structures: structures };

  const handleFileSave = () => {
    const blob = new Blob([JSON.stringify(newIsland, null, 2)], { type: "application/json" });
    saveAs(blob, v4()+".iodl");
  };

  return (
    <button className="btn btn-secondary mt-2" onClick={handleFileSave}>
      Save File
    </button>
  );
}

export default FileSave;
