<template>
  <base-page-layout :tabs="[{ label: 'GIS信息', value: '123' }]">
    <template #main>
      <!-- <base-leaflet :need-draw="true"/> -->
      <div style="width: 100%; height: 100%" ref="leafletRef"></div>
    </template>
  </base-page-layout>
</template>
<script setup lang="ts">
// import { useLeaflet } from "@/hooks/useLeaflet";
import { onMounted, reactive, ref } from "vue";
import { DRAWER_LOCAL, DRAWER_CONFIG } from "@/configs/leaflet";
import BasePageLayout from "@/components/BasePageLayout/index.vue";
import BaseLeaflet from "@/components/BaseLeaflet/index.vue";
import Leaflet from "@/utils/leaflet/index";

const leafletRef = ref();
onMounted(() => {
  const l = new Leaflet(leafletRef.value);
  console.log(l.map)
  l.initDrawer();
});

// const leafletRef = ref<HTMLElement | undefined>();
// const { map, tile } = useLeaflet(leafletRef, {
//   tileOptions: {
//     url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
//     tileFilterOptions: {},
//   },
//   mapOptions: {
//     zoom: 10,
//     centerLat: 29,
//     centerLng: 120,
//   },
// });
</script>
<style>
.leaflet {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  overflow: hidden;
}
</style>
