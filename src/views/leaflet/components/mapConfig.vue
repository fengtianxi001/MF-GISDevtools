<template>
  <base-panel title="地图基础配置">
    <el-form label-position="top" size="small">
      <base-grid-row :columns="2" :gap="6">
        <el-form-item label="中心维度:">
          <el-input-number
            v-model="modelValue.center[0]"
            :precision="3"
            controls-position="right"
            :step="0.001"
            :min="-90"
            :max="90"
          />
        </el-form-item>
        <el-form-item label="中心经度:">
          <el-input-number
            v-model="modelValue.center[1]"
            :precision="3"
            controls-position="right"
            :step="0.001"
            :min="-180"
            :max="180"
          />
        </el-form-item>
      </base-grid-row>
      <base-grid-row :columns="2" :gap="6">
        <el-form-item label="缩放级别:">
          <el-input-number
            v-model="modelValue.zoom"
            controls-position="right"
            :min="1"
            :max="20"
          />
        </el-form-item>
      </base-grid-row>
      <base-grid-row :columns="1">
        <el-button type="danger" @click="emit('onReset')"
          >恢复默认配置</el-button
        >
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
    center: [number, number];
    zoom: number;
  };
}
const props = defineProps<PropsType>();
const emit = defineEmits<{
  (e: "onSubmit"): void;
  (e: "onReset"): void;
}>();
</script>
