import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/styles/global.scss";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "mf-fonts"
import "mf-icos"

createApp(App).use(ElementPlus).use(router).mount("#app");
