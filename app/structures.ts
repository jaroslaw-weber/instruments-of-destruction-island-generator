//export const structureTypes = ["detail_radiotower1","building_storage3a","building_medium2a","building_warehouse1b","building_warehouse2a",
//"building_smokestack1b","detail_light_post1c","detail_fence1a","detail_fence1b"] as const

export const structureDb = [
  /*
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
  */
  ...[
    "basic1",
    "basic2",
    "garage1",
    "garage2",
    "large1",
    "large2",
    "large2a",
    "large3",
    "shed",
  ].map((x) => ({
    name: `structure_building_${x}`,
    size: 1,
    icon: "🏪",
  })),
  ...["1a", "1b", "2a", "2b","2c", "3a", "3b", "3c", "3d", "4a", "4b"].map((x) => ({
    name: `building_basic${x}`,
    size: 1,
    icon: "🏠",
  })),
  /*
  ...["1", "1a", "1b", "1c", "1d", "1e"].map((x) => ({
    name: `structure_tower${x}`,
    size: 1,
    icon: "🗼",
  })),*/
];

export const structureMap = new Map(structureDb.map((s) => [s.name, s]));
