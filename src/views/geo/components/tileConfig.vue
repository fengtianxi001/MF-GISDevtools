<template>
  <base-panel title="操作">
    <base-grid-row :columns="1">
      <!-- <el-button type="primary" size="small">添加模型</el-button> -->
    </base-grid-row>
  </base-panel>
</template>
<script setup lang="ts">
import BasePanel from "@/components/BasePanel/index.vue";
import BaseGridRow from "@/components/BaseGridRow/index.vue";
import { tileOptionsType } from "@/hooks/useLeaflet/types";
import { TILE_FILTER_OPTIONS, TILE_LAYER_URLS } from "@/configs/leaflet";
interface PropsType {
  modelValue: tileOptionsType;
}
const props = defineProps<PropsType>();
const createLabel = (value: number, key: string): string => {
  return `${TILE_FILTER_OPTIONS[key].label}: `;
};
const emit = defineEmits<{
  (e: "onSubmit"): void;
  (e: "onReset"): void;
}>();
</script>
