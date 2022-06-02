import { RouteRecordRaw } from "vue-router";
export type routesType = RouteRecordRaw & {
  children?: routesType[];
  meta: {
    icon: string;
    title: string;
  };
};

export const routes: routesType[] = [
  {
    path: "/devtools",
    name: "devtools",
    meta: {
      title: "leaflet配置",
      icon: "jihebiaoshi01",
    },
    component: () => import("@/views/Test/index.vue"),
  },
  {
    path: "/gewu",
    name: "gewu",
    meta: {
      title: "坐标提取",
      icon: "jihebiaoshi02",
    },
    component: () => import("@/views/Test/index.vue"),
  },
  {
    path: "/geo",
    name: "geo",
    meta: {
      title: "3D地图",
      icon: "jihebiaoshi03",
    },
    component: () => import("@/views/Test/index.vue"),
  },
];
