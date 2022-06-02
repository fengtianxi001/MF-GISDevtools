<template>
  <div class="layout__header">
    <ul class="layout__header__operate">
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <div class="layout__header__search">
      <span>搜索</span>
    </div>
  </div>
</template>
<script setup lang="ts"></script>

<style lang="scss" scoped>
.layout__header {
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-app-region: drag;
  position: relative;
  .layout__header__operate {
    display: flex;
    grid-column-gap: 8px;
    position: absolute;
    top: 10px;
    left: 8px;
    li {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #7c8394;
      cursor: pointer;
      -webkit-app-region: no-drag;
    }
    &:hover{
      li:nth-child(1){
        background-color: #ff5c5c;
      }
      li:nth-child(2){
        background-color: #ffb74d;
      }
      li:nth-child(3){
        background-color: #5fc152;
      }
    }
  }
  .layout__header__search {
    width: 354px;
    height: 28px;
    background-color: #586279;
    background-image: radial-gradient(#566077, #555d71);
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 12px;
    &:hover {
      background-image: radial-gradient(#6a7286, #6b7389);
    }
  }
}
</style>
