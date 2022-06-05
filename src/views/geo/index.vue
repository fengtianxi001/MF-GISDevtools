<template>
  <base-page-layout :tabs="[{ label: '3d地图配置', value: '2dConfig' }]">
    <template #buttons>
      <base-button-group :options="buttonOptions" />
    </template>
    <template #sider>
      <map-config v-model="mapOptions" @on-submit="onMapConfigSubmit" />
    </template>
    <template #main>
      <div class="three" ref="threeRef"></div>
    </template>
  </base-page-layout>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import { tileOptionsType } from "@/hooks/useLeaflet/types";
import { TILE_FILTER_OPTIONS } from "@/configs/leaflet";
import { DEFAULT_OPTIONS } from "@/configs/leaflet";
import BasePageLayout from "@/components/BasePageLayout/index.vue";
import BaseButtonGroup from "@/components/BaseButtonGroup/index.vue";
import MapConfig from "./components/mapConfig.vue";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

import Three from "@/utils/three";
// import ThreeGeo from "@/utils/threeGeo/index.js";
import { loadTerrain } from "@/utils/threeGeoDemo";
import { ElMessage } from "element-plus";
const fs = require("fs");
const path = require("path");
// global.require = require;
const gltfexporter = new GLTFExporter();
let three;
const leafletRef = ref();
const mapOptions = reactive({
  radius: 10,
  center: DEFAULT_OPTIONS.CENTER,
  tokenMapbox: "",
});
const buttonOptions = [
  {
    text: "添加模型",
    type: "primary",
    icon: "cogs",
    handle: () => {
      console.log(123);
    },
  },
  {
    text: "导出场景",
    type: "primary",
    icon: "cogs",
    handle: () => {
      const options = {
  //true导出位置、缩放、旋转变换，false导出节点的矩阵变换
  trs: false,
  //是否只导出可见的
  onlyVisible: true,
  truncateDrawRange: true,
  //是否二进制，true导出glb模型，false导出gltf模型
  binary: false,
  //最大贴图尺寸
  maxTextureSize: Infinity,
};
      gltfexporter.parse(
        terrain,
        function (result) {
          const target = path.resolve("/Users/fengtianxi001/Desktop/");
          const output = JSON.stringify(result, null, 2);
          fs.writeFileSync(target + `/1-2.gltf`, output);
          // console.log("inter1");
          //result即是gltf文件，写入到本地
        },
        options
      );
    },
  },
];
let terrain
const onMapConfigSubmit = async () => {
  const { radius, center, tokenMapbox } = mapOptions;
  // console.log(center);
  if (!tokenMapbox) {
    return ElMessage.error("请填写token");
  }
  if (three) {
    loadTerrain().then((res) => {
      terrain = res;
      three.scene.add(res);
    });
  }
};

const threeRef = ref();

onMounted(() => {
  three = new Three(threeRef.value);
  three.initAxesHelper();
});
</script>

<style>
.three {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  overflow: hidden;
}
</style>
