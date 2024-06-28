import { useAtom } from "jotai";
import { structuresAtom } from "../state";
import { structureMap } from "../structures";

function IslandPreview({}) {
  const [structures] = useAtom(structuresAtom);
  const mapPadding = 100
  // Calculate the maximum and minimum dimensions to fit all structures
  const maxX = Math.max(...structures.map((s) => s.position.x))+mapPadding;
  const minX = Math.min(...structures.map((s) => s.position.x))-mapPadding;
  const maxZ = Math.max(...structures.map((s) => s.position.z))+mapPadding;
  const minZ = Math.min(...structures.map((s) => s.position.z))-mapPadding;

  return (
    <div className="relative bg-base-200 w-full h-96 border rounded-lg overflow-scroll">
      <div className="p-12">
        {structures.map((structure, index) => {
          // Adjusted position calculations to respect the range from min to max
          const adjustedX = ((structure.position.x - minX) / (maxX - minX)) * 100; // Use 70% of the area, offset by 15%
          const adjustedZ = ((structure.position.z - minZ) / (maxZ - minZ)) * 100; // Same for Z axis

          return (
            <div
              key={index}
              className="absolute w-10 h-10 flex items-center justify-center text-2xl text-white"
              style={{
                left: `${adjustedX}%`,
                top: `${adjustedZ}%`,
                transform: "translate(-50%, -50%)", // Centering the element at the calculated positions
              }}
              title={structure.esr_type.bi_name}
            >
              {structureMap.get(structure.esr_type.bi_name)?.icon}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default IslandPreview;
