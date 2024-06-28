//export const structureTypes = ["detail_radiotower1","building_storage3a","building_medium2a","building_warehouse1b","building_warehouse2a",
//"building_smokestack1b","detail_light_post1c","detail_fence1a","detail_fence1b"] as const

export const structureDb = [
  {
    name: "detail_radiotower1",
    size: 1,
    icon: "🗼",
  },
  {
    name: "building_storage3a",
    size: 1,
    icon: "💾",
  },
  {
    name: "building_medium2a",
    size: 1,
    icon: "🏠",
  },
  {
    name: "building_warehouse1b",
    size: 1,
    icon: "🏪",
  },
  {
    name: "building_warehouse2a",
    size: 1,
    icon: "🏪",
  },
  {
    name: "building_smokestack1b",
    size: 1,
    icon: "🚬",
  },
  {
    name: "detail_light_post1c",
    size: 1,
    icon: "💡",
  },
  {
    name: "detail_fence1a",
    size: 1,
    icon: "🧱",
  },
  {
    name: "detail_fence1b",
    size: 1,
    icon: "🧱",
  },
];

export const structureMap = new Map(structureDb.map((s) => [s.name, s]));
