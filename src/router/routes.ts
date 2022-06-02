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
    path: "/",
    name: "leaflet",
    meta: {
      title: "2D地图配置",
      icon: "jihebiaoshi01",
    },
    component: () => import("@/views/leaflet/index.vue"),
  },
  {
    path: "/geo",
    name: "geo",
    meta: {
      title: "3D地图配置",
      icon: "jihebiaoshi03",
    },
    component: () => import("@/views/geo/index.vue"),
  },
  {
    path: "/gis",
    name: "gis",
    meta: {
      title: "GIS信息",
      icon: "jihebiaoshi02",
    },
    component: () => import("@/views/gis/index.vue"),
  }
];
