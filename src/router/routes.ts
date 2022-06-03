import { RouteRecordRaw } from "vue-router";
export type routesType = RouteRecordRaw & {
  children?: routesType[];
  meta: {
    icons: {
      default: string;
      active: string;
    };
    title: string;
  };
};
const requireIcons = (index: string) => {
  return {
    default: require("../assets/icons/menus/" + index + "_default.png"),
    active: require("../assets/icons/menus/" + index + "_active.png"),
  };
};
export const routes: routesType[] = [
  {
    path: "/",
    name: "leaflet",
    meta: {
      title: "2D地图配置",
      icons: requireIcons("01"),
    },
    component: () => import("@/views/leaflet/index.vue"),
  },
  {
    path: "/geo",
    name: "geo",
    meta: {
      title: "3D地图配置",
      icons: requireIcons("02"),
    },
    component: () => import("@/views/geo/index.vue"),
  },
  // {
  //   path: "/gis",
  //   name: "gis",
  //   meta: {
  //     title: "GIS信息",
  //     icons: requireIcons("03"),
  //   },
  //   component: () => import("@/views/gis/index.vue"),
  // },
];
