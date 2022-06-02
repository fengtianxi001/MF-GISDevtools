<template>
  <base-page-layout :tabs="[{ label: '3D地图设置', value: '123' }]">
    <template #sider>
      <base-panel title="地图基础配置">
        <el-form label-position="left" size="small">
          <el-form-item label="中心维度">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="中心纬度">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="地图范围(KM)">
            <el-input></el-input>
          </el-form-item>
        </el-form>
        <el-button size="small"> 预览地图范围</el-button>
        <el-button size="small"> 渲染地图</el-button>
      </base-panel>
      <base-panel title="其他设置">
        <el-button size="small"> 加入模型</el-button>
        <el-button size="small"> 开启编辑模式</el-button>
      </base-panel>
    </template>
    <template #main>
      <div class="leaflet" ref="leafletRef"></div>
    </template>
  </base-page-layout>
</template>
<script setup lang="ts">
import { useLeaflet } from "@/hooks/useLeaflet";
import { reactive, ref } from "vue";
import BasePageLayout from "@/components/BasePageLayout/index.vue";
import BasePanel from "@/components/BasePanel/index.vue";
import BaseGridRow from "@/components/BaseGridRow/index.vue";

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
