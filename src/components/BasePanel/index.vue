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
$border_color: #f4f4f4;
.base-panel {
  width: 100%;
  border-radius: 6px;
  // overflow: hidden;
  border: 1px solid #f4f4f4;
  margin-bottom: 10px;
  .base-panel__title {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    padding: 0 10px;
    border-bottom: 1px solid $border_color;
  }
  .base-panel__content {
      padding: 10px;
  }
}
</style>
