<template>
  <base-panel title="瓦片配置">
    <el-form label-position="top" size="small">
      <base-grid-row :columns="1">
        <el-form-item label="图源选择:">
          <el-select style="width: 100%" v-model="modelValue.url">
            <el-option
              v-for="(value, label) in TILE_LAYER_URLS"
              :label="label"
              :value="value"
            ></el-option>
          </el-select>
        </el-form-item>
      </base-grid-row>

      <base-grid-row :columns="2" :gap="6">
        <el-form-item
          v-for="(value, key) in modelValue.tileFilterOptions"
          :label="createLabel(value, key)"
        >
          <el-slider
            v-model="modelValue.tileFilterOptions[key]"
            v-bind="TILE_FILTER_OPTIONS[key]['props']"
          />
        </el-form-item>
      </base-grid-row>

      <base-grid-row :columns="2" :gap="6">
        <el-button type="danger" @click="emit('onReset')">恢复默认配置</el-button>
        <el-button type="primary" @click="emit('onSubmit')">应用配置</el-button>
      </base-grid-row>
      <base-grid-row :columns="1"> </base-grid-row>
    </el-form>
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
