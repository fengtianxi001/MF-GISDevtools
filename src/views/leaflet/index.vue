<template>
  <base-page-layout :tabs="[{ label: '2d地图配置', value: '2dConfig' }]">
    <template #buttons>
      <base-button-group :options="buttonOptions"></base-button-group>
    </template>
    <template #sider>
      <base-panel title="地图基础配置">
        <el-form label-position="top" size="small">
          <base-grid-row :columns="2" :gap="6">
            <el-form-item label="中心维度:">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="中心纬度:">
              <el-input></el-input>
            </el-form-item>
          </base-grid-row>

          <el-form-item label="缩放倍速:">
            <el-input></el-input>
          </el-form-item>
        </el-form>
      </base-panel>
      <base-panel title="瓦片配置">
        <el-form label-position="top" size="small">
          <base-grid-row :columns="2" :gap="6">
            <el-form-item label="高斯模糊:" v-for="item in 10">
              <el-slider />
            </el-form-item>
          </base-grid-row>
        </el-form>
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
import BaseButtonGroup from "@/components/BaseButtonGroup/index.vue";
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
const buttonOptions = [
  {
    text: "生成配置文件",
    type: "primary",
    icon: "cogs",
    handle: () => {
      console.log(123);
    },
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
