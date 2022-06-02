<template>
  <div class="layout">
    <layout-header />
    <div class="layout__content">
      <layout-menu />
      <div class="layout__main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import LayoutHeader from "./LayoutHeader.vue";
import LayoutMenu from "./LayoutMenu.vue";
</script>
<style lang="scss" scoped>
.layout {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right, #374361, #2b344f);
  display: grid;
  grid-template-rows: 43px 1fr;
  .layout__content {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 64px 1fr;
    .layout__main {
      width: 100%;
      height: 100%;
      background-color: #fff;
      border-radius: 8px 0 0 0;
      overflow: hidden;
    }
  }
}
</style>
