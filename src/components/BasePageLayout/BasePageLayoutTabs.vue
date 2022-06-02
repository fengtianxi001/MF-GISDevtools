<template>
  <ul class="base-page-tabs">
    <li
      v-for="{ label, value } in tabs"
      :key="label"
      @click="onTabHandle(value)"
    >
      <span class="base-page-tabs__title">{{ label }}</span>
      <span class="base-page-tabs__underline"></span>
    </li>
  </ul>
</template>
<script setup lang="ts">
interface PropsType {
  tabs: Array<{
    label: string;
    value: any;
  }>;
}
const props = defineProps<PropsType>();
const onTabHandle = (value) => {};
</script>
<style scoped lang="scss">
.base-page-tabs {
  display: flex;
  column-gap: 20px;
  &__title {
    color: $ele_main_color;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
  }
  &__underline {
    display: flex;
    background-color: $ele_main_color;
    width: 100%;
    height: 3px;
    position: relative;
    bottom: -8px;
    border-radius: 3px 3px 0 0;
  }
}
</style>
