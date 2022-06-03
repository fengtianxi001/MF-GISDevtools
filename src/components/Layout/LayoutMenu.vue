<template>
  <div class="layout__menu">
    <div class="layout__menu__avatar"></div>
    <ul>
      <layout-menu-item
        v-for="(route,index) in routes"
        :key="index"
        :data="route"
      />
    </ul>
  </div>
</template>
<script setup lang="ts">
import LayoutMenuItem from "./LayoutMenuItem.vue";
import { routes } from "@/router/routes";
</script>
<style lang="scss" scoped>
.layout__menu {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .layout__menu__avatar {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-image: url("@/assets/images/avatar.png");
    background-size: contain;
  }
  ul {
    margin-top: 22px;
  }
}
</style>
