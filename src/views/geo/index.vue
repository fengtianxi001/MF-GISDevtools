<template>
  <base-page-layout :tabs="[{ label: '3d地图配置', value: '2dConfig' }]">
    <template #buttons>
      <base-button-group :options="buttonOptions" />
    </template>
    <template #sider>
      <map-config v-model="mapOptions" @on-submit="onMapConfigSubmit" />
    </template>
    <template #main>
      <div v-loading="loading" class="three" ref="threeRef"></div>
    </template>
  </base-page-layout>
</template>
<script setup lang="ts">
import { ref } from "vue";
import BasePageLayout from "@/components/BasePageLayout/index.vue";
import BaseButtonGroup from "@/components/BaseButtonGroup/index.vue";
import MapConfig from "./components/mapConfig.vue";
import { use3DMap } from "@/hooks/use3DMap";
import { useThree } from "@/hooks/useThree";
const threeRef = ref();
const { terrain, mapOptions, loading, init3DMap, saveTerrain } = use3DMap();
const { scene } = useThree(threeRef);
const buttonOptions = [
  {
    text: "导出场景",
    type: "primary",
    icon: "cogs",
    handle: () => {
      saveTerrain();
    },
  },
];
const onMapConfigSubmit = async () => {
  scene.value.remove(terrain.value);
  const result = await init3DMap();
  if (result) {
    // console.log(scene.value)
    scene.value.add(terrain.value);
  }
};
</script>

<style>
.three {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  overflow: hidden;
}
</style>
