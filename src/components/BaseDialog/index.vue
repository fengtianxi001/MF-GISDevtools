<template>
  <el-dialog
    v-model="dialogVisible"
    v-bind="$attrs"
    :append-to-body="true"
    custom-class="base-dialog"
  >
    <div class="base-dialog__header">{{ title }}</div>
    <div class="base-dialog__content">
      <slot></slot>
    </div>
    <div class="base-dialog__footer">
      <el-button
        size="small"
        type="primary"
        style="width: 100%; margin-bottom: 6px"
        @click="onConfirm"
        >{{ confirmText }}</el-button
      >
      <el-button
        size="small"
        type="danger"
        style="width: 100%"
        @click="dialogVisible = false"
        >{{ cancelText }}</el-button
      >
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "标题",
  },
  confirmText: {
    type: String,
    default: "确定",
  },
  cancelText: {
    type: String,
    default: "取消",
  },
});
const emit = defineEmits<{
  (e: "update:modelValue", result: any): void;
  (e: "onConfirm"): void;
}>();
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
const onConfirm = () => {
  dialogVisible.value = false;
  emit("onConfirm");
};
</script>
<style lang="scss">
.base-dialog {
  border-radius: 4px;
  overflow: hidden;
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 0;
  }
  .base-dialog__header {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #dedede;
    padding: 0 6px;
    // background-color: #363e57;
  }
  .base-dialog__content {
    padding: 6px;
    font-size: 12px;
  }
  .base-dialog__footer {
    display: flex;
    padding: 6px;
    flex-direction: column;
  }
}
</style>
