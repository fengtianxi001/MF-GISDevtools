import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { routes as staticRoutes } from "./routes";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
  },
  ...staticRoutes,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
