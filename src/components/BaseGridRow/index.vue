<template>
  <div class="base-grid-row" :style="style">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

interface PropsType {
  columns: number;
  gap?: number;
}
const props = defineProps<PropsType>();
const style = computed(() => {
  return {
    gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
    gridGap: `${props.gap}px`,
  };
});
</script>
<style lang="scss" scoped>
.base-grid-row {
  display: grid;
  margin-bottom: 6px;
}
</style>
