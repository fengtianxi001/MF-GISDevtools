<template>
  <div class="base-page">
    <div class="base-page__header">
      <base-page-layout-tabs :tabs="tabs" />
      <div class="base-page__header-right">
        <el-button size="small">123</el-button>
      </div>
    </div>

    <div class="base-page__content">
      <div class="base-page__sidebar">
        <el-scrollbar class="base-page__sidebar__srollbar">
          <slot name="sider"></slot>
        </el-scrollbar>
      </div>
      <div class="base-page__main">
        <slot name="main"></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import BasePageLayoutTabs from "./BasePageLayoutTabs.vue";
import { ref } from "vue";
interface PropsType {
  tabs: Array<{
    label: string;
    value: any;
  }>;
}
const props = defineProps<PropsType>();
const emit = defineEmits<{
  (e: "tab-click", result: any): void;
}>();
const onTabHandle = (value: any) => {
  emit("tab-click", value);
};
</script>
<style lang="scss" scoped>
$border_color: #f4f4f4;
.base-page {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 40px 1fr;
  overflow: hidden;
  .base-page__header {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid $border_color;
    display: flex;
    align-items: center;
    padding: 0 20px;
    position: relative;
    user-select: none;
    justify-content: space-between;
  }
  .base-page__content {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 310px 1fr;
    background-color: red;
    .base-page__sidebar {
      width: 100%;
      height: calc(100vh - 43px - 40px);
      overflow: auto;
      background-color: #fff;
      border-right: 1px solid $border_color;
      //   padding: 10px;
      overflow: hidden;
      .base-page__sidebar__srollbar {
        padding: 10px;
      }
    }
    .base-page__main {
      width: 100%;
      height: 100%;
      background-color: #fafbfc;
      padding: 10px;
    }
  }
}
</style>
