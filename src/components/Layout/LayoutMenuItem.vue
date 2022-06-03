<template>
  <li
    :class="className"
    ref="menuItemRef"
    @click="router.push(props.data.path)"
    @mouseout="temActive = false"
    @mouseover="temActive = true"
  >
    <img class="menu-item__icon" :src="iconSrc" />
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
const iconSrc = computed(() => {
  if (isActive.value || temActive.value) {
    return props.data.meta.icons.active;
  } else {
    return props.data.meta.icons.default;
  }
});
</script>
<style lang="scss" scoped>
.layout__menu__item {
  width: 55px;
  height: 55px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  user-select: none;
  .menu-item__icon {
    width: 24px;
    height: 24px;
    margin-bottom: 4px;
  }
  &:hover {
    background-color: $my_main_color__deep;
  }
  &.active {
    background-color: $my_main_color__deep;
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
