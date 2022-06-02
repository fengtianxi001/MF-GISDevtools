import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/styles/global.scss";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// import "@/assets/icons/menus/install";

const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
const req = require.context("./assets", true, /\.svg$/);
requireAll(req);

createApp(App).use(ElementPlus).use(router).mount("#app");
