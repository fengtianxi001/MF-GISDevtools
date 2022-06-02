import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import ElementPlus from "element-plus";
import 'element-plus/theme-chalk/src/index.scss';
import "mf-fonts"
import "mf-icos"
// import "@/assets/styles/variables.scss";
// import "@/assets/styles/mixins.scss";
// import "@/assets/styles/base.scss";
// import "@/assets/styles/global.scss";


createApp(App).use(ElementPlus).use(router).mount("#app");
