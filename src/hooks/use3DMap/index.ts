import ThreeGeo from "three-geo";

export async function use3DMap() {
  const tgeo = new ThreeGeo({
    tokenMapbox: "********",
  });
  const terrain = await tgeo.getTerrainRgb([46.5763, 7.9904], 5.0, 12);
  return {
    terrain,
  };
}
