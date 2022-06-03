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

export const DRAWER_LOCAL = {
  draw: {
    toolbar: {
      actions: {
        title: "取消绘画",
        text: "取消",
      },
      finish: {
        title: "结束绘画",
        text: "结束",
      },
      undo: {
        title: "删除最后一步",
        text: "删除最后一步",
      },
      buttons: {
        polyline: "画一个线条",
        polygon: "画一个多边形",
        rectangle: "画一个矩形",
        circle: "画一个圆",
        circlemarker: "圆形标记",
      },
    },
    handlers: {
      circle: {
        tooltip: {
          start: "点击并拖拽,生成圆形范围",
        },
        radius: "半径",
      },
      circlemarker: {
        tooltip: {
          start: "点击地图放置一个圆形标记",
        },
      },
      marker: {
        tooltip: {
          start: "点击地图放置一个标记",
        },
      },
      polygon: {
        tooltip: {
          start: "点击开始绘制多边形",
          cont: "点击继续完成多边形",
          end: "点击第一个点位，闭合图形，完成绘制",
        },
      },
      polyline: {
        error: "<strong>Error:</strong> shape edges cannot cross!",
        tooltip: {
          start: "点击绘制线条",
          cont: "点击继续绘制线条",
          end: "点击最后一个点位，完成绘制",
        },
      },
      rectangle: {
        tooltip: {
          start: "点击并拖拽，生成矩形",
        },
      },
      simpleshape: {
        tooltip: {
          end: "松开鼠标，完成绘制",
        },
      },
    },
  },
  edit: {
    toolbar: {
      actions: {
        save: {
          title: "保存更改",
          text: "保存",
        },
        cancel: {
          title: "取消编辑,并抛弃所有变更",
          text: "取消",
        },
        clearAll: {
          title: "清除所有绘制",
          text: "清除所有",
        },
      },
      buttons: {
        edit: "编辑图层",
        editDisabled: "没有图层可以编辑",
        remove: "删除图层",
        removeDisabled: "没有图层可以删除",
      },
    },
    handlers: {
      edit: {
        tooltip: {
          text: "拖拽移动图层",
          subtext: "点击取消编辑",
        },
      },
      remove: {
        tooltip: {
          text: "点击删除图层",
        },
      },
    },
  },
} as const;

export const DRAWER_CONFIG = (layer) => {
  var MyCustomMarker = L.Icon.extend({
    options: {
      shadowUrl: null,
      iconAnchor: new L.Point(25 / 4, 41 / 4),
      iconSize: new L.Point(25 / 2, 41 / 2),
      iconUrl: require("../assets/icons/marker/marker-icon.png"),
    },
  });

  return {
    position: "topright",
    draw: {
      polyline: {
        shapeOptions: {
          color: "#b13d3d",
          weight: 5,
        },
      },
      polygon: {
        allowIntersection: false, // Restricts shapes to simple polygons\
        shapeOptions: {
          color: "#b13d3d",
          weight: 5,
        },
      },
      circle: {
        shapeOptions: {
          color: "#b13d3d",
          weight: 5,
        },
      },
      rectangle: {
        shapeOptions: {
          color: "#b13d3d",
          weight: 5,
        },
      },
      marker: {
        icon: new MyCustomMarker(),
      },
      circlemarker: {
        shapeOptions: {
          color: "#b13d3d",
          weight: 5,
        },
      },
    },
    edit: {
      featureGroup: layer, //REQUIRED!!
      remove: true,
    },
  };
};
