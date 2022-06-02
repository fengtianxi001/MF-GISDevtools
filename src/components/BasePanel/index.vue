<template>
  <div class="base-panel">
    <div class="base-panel__title">{{ title }}</div>
    <div class="base-panel__content">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
interface propsType {
  title: string;
}
const props = defineProps<propsType>();
</script>
<style scoped lang="scss">
.base-panel {
  width: 100%;
  border-radius: 6px;
  // overflow: hidden;
  // border: 1px solid #dbdbdd;
  margin-bottom: 10px;
  .base-panel__title {
    $height: 30px;
    $charHeight:14px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    padding: 0 10px;
    // border-bottom: 1px solid #dbdbdd;
    // background-color: #f3f3f3;
    position: relative;
    font-weight: bolder;
    // padding: 0 4px;
    &::before{
      content: "";
      width: 2px;
      height: $charHeight;
      border-radius: 2px;
      background-color: $ele_main_color;
      position: absolute;
      left: 4px;
      top: calc((#{$height} - #{$charHeight}) / 2);
    }
  }
  .base-panel__content {
    padding: 6px;
  }
}
</style>
