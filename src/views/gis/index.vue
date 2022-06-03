<template>
  <base-page-layout :tabs="[{ label: 'GIS信息', value: '123' }]">
    <template #main>
      <div style="width: 100%; height: 100%" ref="leafletRef"></div>
    </template>
  </base-page-layout>
</template>
<script setup lang="ts">
// import { useLeaflet } from "@/hooks/useLeaflet";
import { onMounted, reactive, ref } from "vue";
import BasePageLayout from "@/components/BasePageLayout/index.vue";
import BaseLeaflet from "@/components/BaseLeaflet/index.vue";
import { useLeaflet } from "@/hooks/useLeaflet";
const leafletRef = ref<HTMLElement | undefined>();
const { initDrawer, drawerLayer } = useLeaflet(leafletRef);
// onMounted(() => {
//   initDrawer();
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
