<template>
  <li
    :class="className"
    ref="menuItemRef"
    @click="router.push(props.data.path)"
    @mouseout="temActive = false"
    @mouseover="temActive = true"
  >
    <!-- <layout-menu-icon :name="data.meta.icon" /> -->
    <span>{{ data.meta.title }}</span>
  </li>
</template>
<script setup lang="ts">
// import LayoutMenuIcon from "@/components/LayoutMenuIcon.vue";
import { routesType } from "@/router/routes";
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
interface propsType {
  data: routesType;
}
const props = defineProps<propsType>();
const temActive = ref(false);
const isActive = computed(() => route.path === props.data.path);
const className = computed(() =>
  temActive.value || isActive.value
    ? "layout__menu__item active"
    : "layout__menu__item"
);
const menuItemRef = ref();
const switchIconStatus = () => {
  const ele = menuItemRef.value as HTMLElement;
  if (isActive.value || temActive.value) {
    ele.style.setProperty("--menu-icon-color1", "#4d6fef");
    ele.style.setProperty("--menu-icon-color2", "#80d0bb");
    ele.style.setProperty("--menu-icon-color3", "#3a43f5");
  } else {
    ele.style.setProperty("--menu-icon-color1", "#c4c8d0");
    ele.style.setProperty("--menu-icon-color2", "#fff");
    ele.style.setProperty("--menu-icon-color3", "#c4c8d0");
  }
};
watch([isActive, temActive], switchIconStatus);
onMounted(switchIconStatus);
</script>
<style lang="scss" scoped>
.layout__menu__item {
  --menu-icon-color1: #c4c8d0;
  --menu-icon-color2: #fff;
  --menu-icon-color3: #c4c8d0;

  width: 55px;
  height: 55px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  user-select: none;
  &:hover {
    background-color: #2b3349;
  }
  &.active {
    background-color: #2b3349;
  }
  cursor: pointer;
  .icon {
    font-size: 24px;
  }
  span {
    color: #fff;
    font-size: 10px;
    transform: scale(0.85);
  }
}
</style>
