import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
    // redirect: moduleProject[0]["path"],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
