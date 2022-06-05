import ThreeGeo from "three-geo/dist/three-geo.esm";
import { DEFAULT_OPTIONS } from "@/configs/leaflet";
import { reactive, shallowRef } from "vue";
import { ElMessage } from "element-plus";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
const { remote } = require("electron");
const fs = require("fs");
export function use3DMap() {
  const mapOptions = reactive({
    radius: 10,
    center: [...(DEFAULT_OPTIONS.CENTER as [number, number])],
    tokenMapbox: "",
    level: 12,
  });
  const terrain = shallowRef<any>();
  const init3DMap = async () => {
    const { radius, center, tokenMapbox, level } = mapOptions;
    if (!tokenMapbox) {
      ElMessage.error("token 不能为空");
    } else {
      const tgeo = new ThreeGeo({
        tokenMapbox: tokenMapbox,
      });
      const result = await tgeo.getTerrainRgb(center, radius, level);
      terrain.value = result;
      return result;
    }
  };
  const saveTerrain = async () => {
    const target = await remote.dialog.showSaveDialogSync({
      title: "保存文件",
      defaultPath: "terrain.gltf",
    });
    if (!target) return void 0;
    const options = {
      trs: false,
      onlyVisible: true,
      truncateDrawRange: true,
      binary: false,
      maxTextureSize: Infinity,
    };
    const gltfexporter = new GLTFExporter();
    gltfexporter.parse(
      terrain.value,
      function (result) {
        const output = JSON.stringify(result, null, 2);
        fs.writeFileSync(target, output);
      },
      options
    );
  };
  return {
    terrain,
    mapOptions,
    init3DMap,

    saveTerrain,
  };
}
