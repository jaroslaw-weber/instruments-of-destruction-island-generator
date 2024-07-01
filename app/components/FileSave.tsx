import { useAtom } from "jotai";
import { islandAtom, structuresAtom, terrainAtom } from "../state";
import { saveAs } from "file-saver";
import { v4 } from "uuid";

function FileSave() {
  const [structures] = useAtom(structuresAtom);
  const [terrain] = useAtom(terrainAtom);
  const [island] = useAtom(islandAtom);
  const base = require("../basic.json");
  const newIsland = { ...base, ...island, m_structures: structures, m_loops: terrain };

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
