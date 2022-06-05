<template>
  <base-panel title="地图基础配置">
    <el-form label-position="top" size="small">
      <base-grid-row :columns="2" :gap="6">
        <el-form-item label="中心维度:">
          <el-input-number
            v-model="modelValue.center[0]"
            :precision="4"
            controls-position="right"
            :step="0.0001"
            :min="-90"
            :max="90"
          />
        </el-form-item>
        <el-form-item label="中心经度:">
          <el-input-number
            v-model="modelValue.center[1]"
            :precision="4"
            controls-position="right"
            :step="0.0001"
            :min="-180"
            :max="180"
          />
        </el-form-item>
      </base-grid-row>
      <base-grid-row :columns="2" :gap="6">
        <el-form-item label="地图级别:">
          <el-input-number
            v-model="modelValue.level"
            controls-position="right"
            :min="1"
            :max="20"
          />
        </el-form-item>
        <el-form-item label="范围(km):">
          <el-input-number
            v-model="modelValue.radius"
            controls-position="right"
            :min="1"
            :max="20"
          />
        </el-form-item>
      </base-grid-row>
      <base-grid-row :columns="1">
        <el-form-item label="Mapbox Token">
          <el-input v-model="modelValue.tokenMapbox" />
        </el-form-item>
      </base-grid-row>
      <base-grid-row :columns="1">
        <el-button type="primary" @click="emit('onSubmit')">渲染地形</el-button>
      </base-grid-row>
    </el-form>
  </base-panel>
  <base-dialog title="预览" v-model="dialogVisible">
    <div class="leaflet" ref="leafletRef"></div>
  </base-dialog>
</template>
<script setup lang="ts">
import BasePanel from "@/components/BasePanel/index.vue";
import BaseGridRow from "@/components/BaseGridRow/index.vue";
import BaseDialog from "@/components/BaseDialog/index.vue";
import { useLeaflet } from "@/hooks/useLeaflet";
import { ref } from "vue";
interface PropsType {
  modelValue: {
    center: [number, number];
    radius: number;
    tokenMapbox?: string;
    level: number;
  };
}
const props = defineProps<PropsType>();
const leafletRef = ref<HTMLElement | undefined>();
const dialogVisible = ref(false);
const emit = defineEmits<{
  (e: "onSubmit"): void;
}>();

const onPreview = () => {
  dialogVisible.value = true;
  // const { map, adjustMap } = useLeaflet(leafletRef);
  // adjustMap(props.modelValue.center, 10);
};
</script>
<style lang="scss" scoped>
.leaflet {
  width: 100%;
  border-radius: 6px;
  height: 300px;
}
</style>
