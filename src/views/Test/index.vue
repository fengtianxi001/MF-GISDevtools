<template>
  <base-page-layout :tabs="[{ label: 'test', value: '123' }]">
    <template #sider>123</template>
    <template #main>
      <div class="leaflet" ref="leafletRef"></div>
    </template>
  </base-page-layout>
</template>
<script setup lang="ts">
import { useLeaflet } from "@/hooks/useLeaflet";
import { reactive, ref } from "vue";
import BasePageLayout from "@/components/BasePageLayout/index.vue";

const leafletRef = ref<HTMLElement | undefined>();
const { map, tile } = useLeaflet(leafletRef, {
  tileOptions: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    tileFilterOptions: {},
  },
  mapOptions: {
    zoom: 10,
    center: [29, 120],
  },
});
</script>
<style>
.leaflet {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  overflow: hidden;
}
</style>
