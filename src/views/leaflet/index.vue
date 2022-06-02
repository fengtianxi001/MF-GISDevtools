<template>
  <base-page-layout :tabs="[{ label: '2d地图配置', value: '2dConfig' }]">
    <template #buttons>
      <base-button-group :options="buttonOptions"></base-button-group>
    </template>
    <template #sider>
      <map-config
        v-model="mapOptions"
        @on-submit="onMapConfigSubmit"
        @on-reset="onMapConfigReset"
      />
      <tile-config
        v-model="tileOptions"
        @on-submit="onTileConfigSubmit"
        @on-reset="onTileConfigReset"
      />
    </template>
    <template #main>
      <div class="leaflet" ref="leafletRef"></div>
    </template>
  </base-page-layout>
</template>
<script setup lang="ts">
import { useLeaflet } from "@/hooks/useLeaflet";
import { reactive, ref } from "vue";
import { tileOptionsType } from "@/hooks/useLeaflet/types";
import { TILE_FILTER_OPTIONS } from "@/configs/leaflet";
import BasePageLayout from "@/components/BasePageLayout/index.vue";
import BaseButtonGroup from "@/components/BaseButtonGroup/index.vue";
import MapConfig from "./components/mapConfig.vue";
import TileConfig from "./components/tileConfig.vue";
const leafletRef = ref<HTMLElement | undefined>();
const tileOptions: tileOptionsType = reactive({
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  tileFilterOptions: {
    blur: 0,
    brightness: 100,
    contrast: 100,
    grayscale: 0,
    "hue-rotate": 0,
    opacity: 100,
    invert: 0,
    saturate: 100,
    sepia: 0,
  },
});
const mapOptions = reactive({
  zoom: 10,
  centerLat: 29,
  centerLng: 120,
});
const { map, tile } = useLeaflet(leafletRef, { tileOptions, mapOptions });
const buttonOptions = [
  {
    text: "生成配置文件",
    type: "primary",
    icon: "cogs",
    handle: () => {
      console.log(123);
    },
  },
];
const onMapConfigSubmit = () => {
  const { zoom, centerLat, centerLng } = mapOptions;
  map.value.flyTo([centerLat, centerLng], zoom);
};
const onMapConfigReset = () => {
  mapOptions.zoom = 10;
  mapOptions.centerLat = 29;
  mapOptions.centerLng = 120;
};
const onTileConfigSubmit = () => {
  const { url, tileFilterOptions } = tileOptions;
  //@ts-ignore
  if (url !== tile.value!._url) {
    tile.value.setUrl(url);
  }
  leafletRef.value.style.filter = Object.keys(tileFilterOptions).reduce(
    (prev, key) => {
      const cur = ` ${key}(${tileFilterOptions[key]}${TILE_FILTER_OPTIONS[key]["unit"]})`;
      return (prev += cur);
    },
    ""
  );
};
const onTileConfigReset = () => {
  tileOptions.url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  tileOptions.tileFilterOptions = {
    blur: 0,
    brightness: 100,
    contrast: 100,
    grayscale: 0,
    "hue-rotate": 0,
    opacity: 100,
    invert: 0,
    saturate: 100,
    sepia: 0,
  };
};
</script>
<style>
.leaflet {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  overflow: hidden;
}
</style>
