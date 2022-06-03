<template>
  <div class="leaflet" ref="leafletRef"></div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import L from "leaflet";
import "leaflet-draw"
import "leaflet-draw/dist/leaflet.draw.css"
const leafletRef = ref<HTMLElement | undefined>();
const map = ref<L.Map | undefined>();
const tile = ref<L.TileLayer | undefined>();
const props = defineProps({
  center: {
    type: Array,
    default: () => [29, 120],
  },
  zoom: {
    type: Number,
    default: 10,
  },
  needDraw: {
    type: Boolean,
    default: false,
  },
  tilerURL: {
    type: String,
    default: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
});
onMounted(() => {
  map.value = L.map(leafletRef.value, {
    attributionControl: false,
    zoomControl: false,
    center: props.center as [number, number],
    zoom: props.zoom,
  });
  tile.value = L.tileLayer(props.tilerURL);
  map.value.addLayer(tile.value);
  if (props.needDraw) {
    var drawnItems = new L.FeatureGroup();
    map.value.addLayer(drawnItems);
    //@ts-ignore
    var drawControl = new L.Control.Draw({
      draw: {
        //绘制线
        polyline: true,
        //绘制多边形
        polygon: true,
        //绘制矩形
        rectangle: true,
        //绘制圆
        circle: true,
        //绘制标注
        marker: true,
        //绘制圆形标注
        circlemarker: true,
      },
      edit: {
        //绘制图层
        featureGroup: drawnItems,
        //图形编辑控件
        edit: true,
        //图形删除控件
        remove: true,
      },
    });
    map.value.addControl(drawControl);
    //绘制事件
    //@ts-ignore
    map.value.on(L.Draw.Event.CREATED, function (e) {
      var type = e.layerType,
        //获取绘制图层
        drawlayer = e.layer;
      if (type === "marker") {
        drawlayer.bindPopup("A popup!");
      }
      drawnItems.addLayer(drawlayer);
    });
  }
});
</script>
<style lang="scss" scoped>
.leaflet {
  width: 100%;
  height: 100%;
}
</style>
