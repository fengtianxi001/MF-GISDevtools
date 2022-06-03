<template>
  <div class="base-page">
    <div class="base-page__header">
      <base-page-layout-tabs :tabs="tabs" />
      <slot name="buttons"></slot>
    </div>

    <div class="base-page__content">
      <div class="base-page__sidebar" v-if="$slots.sider">
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
import BaseButtonGroup from "@/components/BaseButtonGroup/index.vue";
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
.base-page {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 40px 1fr;
  overflow: hidden;
  .base-page__header {
    width: 100%;
    height: 40px;
    // border-bottom: 1px solid $my_border_color;
    border-bottom: 1px solid #dbdbdd;
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
    display: flex;
    // grid-template-columns: 310px 1fr;
    .base-page__sidebar {
      width: 310px;
      flex-shrink: 0;
      height: calc(100vh - 43px - 40px);
      overflow: auto;
      background-color: #fff;
      border-right: 1px solid $my_border_color;
      overflow: hidden;
      .base-page__sidebar__srollbar {
        flex:1;
        padding: 0 10px;
        overflow-x: hidden;
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
