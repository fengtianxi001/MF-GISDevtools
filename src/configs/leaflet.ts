export const TILE_LAYER_URLS = {
  街景图: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  卫星图:
    "https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
} as const;

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
      max: 500,
      min: 0,
    },
  },
  "hue-rotate": {
    label: "色相旋转",
    key: "hue-rotate",
    unit: "deg",
    default: 0,
    props: {
      max: 500,
      min: 0,
    },
  },
  opacity: {
    label: "透明度",
    key: "opacity",
    unit: "%",
    default: 100,
    props: {
      max: 500,
      min: 0,
    },
  },
  invert: {
    label: "反转",
    key: "invert",
    unit: "%",
    default: 0,
    props: {
      max: 500,
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
