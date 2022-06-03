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
  <base-dialog
    v-model="dialogVisible"
    title="配置文件"
    confirmText="复制到粘贴板"
    @on-confirm="onClipboard"
  >
    <!-- <base-code :code="configText" /> -->
    {{ configText }}
  </base-dialog>
</template>
<script setup lang="ts">
import { useLeaflet } from "@/hooks/useLeaflet";
import { reactive, ref } from "vue";
import { tileOptionsType } from "@/hooks/useLeaflet/types";
import { DEFAULT_OPTIONS } from "@/configs/leaflet";
import BasePageLayout from "@/components/BasePageLayout/index.vue";
import BaseButtonGroup from "@/components/BaseButtonGroup/index.vue";
import MapConfig from "./components/mapConfig.vue";
import TileConfig from "./components/tileConfig.vue";
import BaseDialog from "@/components/BaseDialog/index.vue";
import { ElMessage } from "element-plus";
// import BaseCode from "@/components/BaseCode/index.vue";
const { clipboard } = require("electron");
const leafletRef = ref<HTMLElement | undefined>();
const dialogVisible = ref(false);
const configText = ref("");
const tileOptions: tileOptionsType = reactive({
  url: DEFAULT_OPTIONS.TILE_URL,
  tileFilterOptions: { ...DEFAULT_OPTIONS.TILE_FILTER },
});
const mapOptions = reactive({
  zoom: DEFAULT_OPTIONS.ZOOM,
  center: DEFAULT_OPTIONS.CENTER as [number, number],
});
const onClipboard = () => {
  clipboard.writeText(configText.value);
  ElMessage.success("复制成功");
};

const { tile, adjustMap, adjustTileUrl, adjustTileFilter } =
  useLeaflet(leafletRef);
const buttonOptions = [
  {
    text: "生成配置文件",
    type: "primary",
    icon: "cogs",
    handle: () => {
      const result = {
        地图配置: mapOptions,
        地图瓦片: tileOptions.url,
        地图滤镜: leafletRef.value.style.filter?.split(" "),
      };
      dialogVisible.value = true;
      configText.value = JSON.stringify(result, null, 4);
    },
  },
];
const onMapConfigSubmit = () => adjustMap(mapOptions.center, mapOptions.zoom);
const onMapConfigReset = () => {
  mapOptions.zoom = 10;
  mapOptions.center = DEFAULT_OPTIONS.CENTER as [number, number];
};
const onTileConfigSubmit = () => {
  const { url, tileFilterOptions } = tileOptions;
  //@ts-ignore
  if (url !== tile.value._url) {
    adjustTileUrl(url);
  }
  adjustTileFilter(tileFilterOptions);
};
const onTileConfigReset = () => {
  tileOptions.url = DEFAULT_OPTIONS.TILE_URL;
  tileOptions.tileFilterOptions = { ...DEFAULT_OPTIONS.TILE_FILTER };
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
