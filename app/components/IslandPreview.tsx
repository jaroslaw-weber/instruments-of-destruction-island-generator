import { useAtom } from "jotai";
import { structuresAtom } from "../state";
import { structureMap } from "../structures";

function IslandPreview({}) {
  const [structures] = useAtom(structuresAtom);
  // Calculate the maximum dimensions to fit all structures
  const maxX = Math.max(...structures.map((s) => s.position.x));
  const maxZ = Math.max(...structures.map((s) => s.position.z));

  return (
    <div className="relative bg-base-200 w-full h-96 border rounded-lg overflow-hidden">
      {structures.map((structure, index) => (
        <div
          key={index}
          className="absolute  w-10 h-10 flex items-center justify-center text-4xl text-white"
          style={{
            left: `${(structure.position.x / maxX) * 100}%`,
            top: `${(structure.position.z / maxZ) * 100}%`, // Assuming z is used for top positioning
            transform: "translate(-50%, -50%)",
          }}
          title={structure.esr_type.bi_name}
        >
          {/* Optional: Initials of the building name */}
          {structureMap.get(structure.esr_type.bi_name)?.icon}
        </div>
      ))}
    </div>
  );
}

export default IslandPreview;
