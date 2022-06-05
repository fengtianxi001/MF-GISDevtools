import ThreeGeo from "three-geo/dist/three-geo.esm";
import * as THREE from "three";

export async function loadTerrain() {
  const tgeo = new ThreeGeo({
    unitsSide: 100,
    constUnitsSide: 700,
    tokenMapbox:
      "pk.eyJ1IjoiZmVuZ3RpYW54aTAwMSIsImEiOiJjbDNwdXNsYzIwNjJ3M2Jud3Izd3JkZDRoIn0.LzqYl3XI0-8dmOHPZO2uzw",
  });
  const terrain = await tgeo.getTerrainRgb([26.342523, 119.840262], 5, 12);
  return terrain
}
