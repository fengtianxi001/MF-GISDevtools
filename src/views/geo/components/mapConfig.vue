<template>
  <base-panel title="地图基础配置">
    <el-form label-position="top" size="small">
      <base-grid-row :columns="2" :gap="6">
        <el-form-item label="中心维度:">
          <el-input-number
            v-model="modelValue.centerLat"
            :precision="4"
            controls-position="right"
            :step="0.0001"
            :min="-90"
            :max="90"
          />
        </el-form-item>
        <el-form-item label="中心经度:">
          <el-input-number
            v-model="modelValue.centerLng"
            :precision="4"
            controls-position="right"
            :step="0.0001"
            :min="-180"
            :max="180"
          />
        </el-form-item>
      </base-grid-row>
      <base-grid-row :columns="2" :gap="6">
        <el-form-item label="范围(km):">
          <el-input-number
            v-model="modelValue.zoom"
            controls-position="right"
            :min="1"
            :max="20"
          />
        </el-form-item>
      </base-grid-row>
      <base-grid-row :columns="1">
        <el-form-item label="Mapbox Token">
          <el-input v-model="modelValue.zoom" />
        </el-form-item>
      </base-grid-row>
      <base-grid-row :columns="1">
        <el-button type="primary" @click="emit('onReset')"
          >预览地图范围</el-button
        >
        <!-- <el-button type="primary" @click="emit('onSubmit')">渲染地形</el-button> -->
      </base-grid-row>
      <base-grid-row :columns="1">
        <!-- <el-button type="primary" @click="emit('onReset')">预览地图范围</el-button> -->
        <el-button type="primary" @click="emit('onSubmit')">渲染地形</el-button>
      </base-grid-row>
    </el-form>
  </base-panel>
</template>
<script setup lang="ts">
// import BasePageLayout from "@/components/BasePageLayout/index.vue";
import BasePanel from "@/components/BasePanel/index.vue";
import BaseGridRow from "@/components/BaseGridRow/index.vue";
interface PropsType {
  modelValue: {
    centerLat: number;
    centerLng: number;
    zoom: number;
  };
}
const props = defineProps<PropsType>();
const emit = defineEmits<{
  (e: "onSubmit"): void;
  (e: "onReset"): void;
}>();
</script>
