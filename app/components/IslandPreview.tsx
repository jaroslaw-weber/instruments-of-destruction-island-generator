import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { structuresAtom, terrainAtom } from "../state";
import { structureMap } from "../structures";

function IslandPreview({}) {
  const [structures] = useAtom(structuresAtom);
  const [terrainArray] = useAtom(terrainAtom);
  const mapPadding = 100;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Calculate bounds considering all terrains and structures
  const maxX = Math.max(...structures.map((s) => s.position.x), ...terrainArray.flatMap(t => t.m_smooth_points.map(p => p.x))) + mapPadding;
  const minX = Math.min(...structures.map((s) => s.position.x), ...terrainArray.flatMap(t => t.m_smooth_points.map(p => p.x))) - mapPadding;
  const maxZ = Math.max(...structures.map((s) => s.position.z), ...terrainArray.flatMap(t => t.m_smooth_points.map(p => p.z))) + mapPadding;
  const minZ = Math.min(...structures.map((s) => s.position.z), ...terrainArray.flatMap(t => t.m_smooth_points.map(p => p.z))) - mapPadding;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d');

    if (canvas && ctx) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // Clear previous drawings
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Loop through each terrain configuration and draw its smooth points
      terrainArray.forEach(terrain => {
        ctx.beginPath();
        terrain.m_smooth_points.forEach((point, index) => {
          const x = ((point.x - minX) / (maxX - minX)) * canvas.width;
          const z = ((point.z - minZ) / (maxZ - minZ)) * canvas.height;

          if (index === 0) {
            ctx.moveTo(x, z);
          } else {
            ctx.lineTo(x, z);
          }
        });
        if (terrain.m_pathloop) {
          ctx.closePath(); // Connects the last point to the first if it's a loop
        }
        ctx.strokeStyle = "#008800"; // Green line for terrain
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }
  }, [maxX, minX, maxZ, minZ, terrainArray]); // Depend on terrain data too

  return (
    <div className="relative bg-base-200 w-full h-96 border rounded-lg overflow-scroll">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <div className="p-12">
        {structures.map((structure, index) => {
          const adjustedX = ((structure.position.x - minX) / (maxX - minX)) * 100;
          const adjustedZ = ((structure.position.z - minZ) / (maxZ - minZ)) * 100;

          return (
            <div
              key={index}
              className="absolute w-10 h-10 flex items-center justify-center text-2xl text-white"
              style={{
                left: `${adjustedX}%`,
                top: `${adjustedZ}%`,
                transform: "translate(-50%, -50%)",
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
