<template>
  <div class="base-button-group">
    <el-button
      v-for="{ icon, type, handle, text } in options"
      :key="text"
      size="small"
      :type="type"
      @click="onHandle(handle)"
    >
      <template v-if="icon">
        <i :class="iconClassName(icon)"></i>
      </template>
      {{ text }}
    </el-button>
  </div>
</template>
<script setup lang="ts">
import { ButtonType } from "./types";
import { isFunction } from "lodash-es";
interface PropsType {
  options: Array<ButtonType>;
}
const props = defineProps<PropsType>();
const iconClassName = (icon) => `mfs mf-${icon} base-button-icon`;
const onHandle = (handle) => isFunction(handle) && handle();
</script>
<style lang="scss" scoped>
.base-button-group {
  display: flex;
  &:deep(.el-button){
    margin-left: 6px!important;
  }
  .base-button-icon {
    margin-right: 4px;
  }
}
</style>
