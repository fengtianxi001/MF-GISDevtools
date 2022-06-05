import L from "leaflet";

export const TILE_LAYER_URLS = {
  STREET: {
    label: "街景图",
    value: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
  SATELLITE: {
    label: "卫星图",
    value:
      "https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
  },
} as const;

export const DEFAULT_OPTIONS = {
  CENTER: [26.342523, 119.840262] as L.LatLngExpression,
  ZOOM: 14,
  TILE_URL: TILE_LAYER_URLS.STREET.value,
  TILE_FILTER: {
    blur: 0,
    brightness: 100,
    contrast: 100,
    grayscale: 0,
    "hue-rotate": 0,
    opacity: 100,
    invert: 0,
    saturate: 100,
    sepia: 0,
  },
};

export const TILE_FILTER_OPTIONS = {
  blur: {
    label: "高斯模糊",
    key: "blur",
    unit: "px",
    default: 0,
    props: {
      max: 100,
      min: 0,
    },
  },
  brightness: {
    label: "曝光度",
    key: "brightness",
    unit: "%",
    default: 100,
    props: {
      max: 500,
      min: 0,
    },
  },
  contrast: {
    label: "对比度",
    key: "contrast",
    unit: "%",
    default: 100,
    props: {
      max: 500,
      min: 0,
    },
  },
  grayscale: {
    label: "灰度",
    key: "grayscale",
    unit: "%",
    default: 0,
    props: {
      max: 200,
      min: 0,
    },
  },
  "hue-rotate": {
    label: "色相旋转",
    key: "hue-rotate",
    unit: "deg",
    default: 0,
    props: {
      max: 360 * 2,
      min: 0,
    },
  },
  opacity: {
    label: "透明度",
    key: "opacity",
    unit: "%",
    default: 100,
    props: {
      max: 100,
      min: 0,
    },
  },
  invert: {
    label: "反转",
    key: "invert",
    unit: "%",
    default: 0,
    props: {
      max: 100,
      min: 0,
    },
  },
  saturate: {
    label: "饱和度",
    key: "saturate",
    unit: "%",
    default: 100,
    props: {
      max: 500,
      min: 0,
    },
  },
  sepia: {
    label: "深褐色",
    key: "sepia",
    unit: "%",
    default: 0,
    props: {
      max: 500,
      min: 0,
    },
  },
} as const;
