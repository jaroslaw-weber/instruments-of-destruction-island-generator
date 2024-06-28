import { useAtom } from "jotai";
import { islandAtom, structuresAtom } from "../state";
import { saveAs } from "file-saver";
import { v4 } from "uuid";

function FileSave() {
  const [structures] = useAtom(structuresAtom);
  const [island] = useAtom(islandAtom);
  const newIsland = { ...island, m_structures: structures };

  const handleFileSave = () => {
    const blob = new Blob([JSON.stringify(newIsland, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, "random_" + v4().substring(0, 6) + ".iodl");
  };

  return (
    <button className="btn flex-1 w-full h-full " onClick={handleFileSave}>
      save island to file
    </button>
  );
}

export default FileSave;
