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
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { tileOptionsType } from "@/hooks/useLeaflet/types";
import { TILE_FILTER_OPTIONS } from "@/configs/leaflet";
import BasePageLayout from "@/components/BasePageLayout/index.vue";
import BaseButtonGroup from "@/components/BaseButtonGroup/index.vue";
import MapConfig from "./components/mapConfig.vue";
import { DEFAULT_OPTIONS } from "@/configs/leaflet";
import { useThree } from "@/hooks/useThree";
import THREE from "three";
import ThreeGeo from "@/utils/Three-geo/ThreeGeo.js";
// console.log(THREE)
const leafletRef = ref<HTMLElement | undefined>();
const mapOptions = reactive({
  radius: 10,
  center: DEFAULT_OPTIONS.CENTER as [number, number],
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
      console.log(123);
    },
  },
];
const onMapConfigSubmit = async () => {
  const { radius, center, tokenMapbox } = mapOptions;
  const tgeo = new ThreeGeo({
    tokenMapbox: tokenMapbox,
  });
  const terrain = await tgeo.getTerrainRgb(center, radius, 12);
  console.log(terrain);
};
const threeRef = ref();

const { scene, axesHelper } = useThree(threeRef);
onMounted(() => {
  console.log(scene.value, axesHelper.value)
  scene.value.add(axesHelper.value);
})
</script>
<style>
.three {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  overflow: hidden;
}
</style>
