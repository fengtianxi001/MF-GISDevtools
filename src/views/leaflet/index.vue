<template>
  <base-page-layout :tabs="[{ label: '2d地图配置', value: '2dConfig' }]">
    <template #buttons>
      <base-button-group :options="buttonOptions" />
    </template>
    <template #sider>
      <map-config v-model="mapOptions" @on-reset="resetMapOptions" />
      <tile-config v-model="tileOptions" @on-reset="resetTileOptions" />
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
    {{ generalOptions }}
  </base-dialog>
</template>
<script setup lang="ts">
import { useLeaflet } from "@/hooks/useLeaflet";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import BasePageLayout from "@/components/BasePageLayout/index.vue";
import BaseButtonGroup from "@/components/BaseButtonGroup/index.vue";
import MapConfig from "./components/mapConfig.vue";
import TileConfig from "./components/tileConfig.vue";
import BaseDialog from "@/components/BaseDialog/index.vue";
const { clipboard } = require("electron");
const leafletRef = ref<HTMLElement | undefined>();
const {
  mapOptions,
  tileOptions,
  generalOptions,
  resetMapOptions,
  resetTileOptions,
} = useLeaflet(leafletRef);
const dialogVisible = ref(false);
const onClipboard = () => {
  clipboard.writeText(generalOptions.value);
  ElMessage.success("复制成功");
};
const buttonOptions = [
  {
    text: "生成配置文件",
    type: "primary",
    icon: "cogs",
    handle: () => (dialogVisible.value = true),
  },
];
</script>
<style>
.leaflet {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  overflow: hidden;
}
</style>
