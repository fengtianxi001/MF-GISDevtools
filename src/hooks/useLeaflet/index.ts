import L from "leaflet";
// import geojsonArea from "@mapbox/geojson-area";
// import polygonCenter from "geojson-polygon-center";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import {
  DRAWER_LOCAL,
  DRAWER_CONFIG,
  DEFAULT_OPTIONS,
} from "@/configs/leaflet";
import { onMounted, ref, Ref } from "vue";
import { TILE_FILTER_OPTIONS } from "@/configs/leaflet";
export function useLeaflet(element: Ref<HTMLElement | null | undefined>) {
  const map = ref<L.Map | undefined>();
  const tile = ref<L.TileLayer | undefined>();
  const drawerLayer = ref<L.FeatureGroup | undefined>();
  onMounted(() => {
    map.value = L.map(element.value, {
      center: DEFAULT_OPTIONS.CENTER,
      zoom: DEFAULT_OPTIONS.ZOOM,
      zoomControl: false,
      attributionControl: false,
      crs: L.CRS.EPSG3857,
    });
    tile.value = L.tileLayer(DEFAULT_OPTIONS.TILE_URL).addTo(map.value);
    // initDrawer()
  });
  const initDrawer = () => {
    drawerLayer.value = new L.FeatureGroup();
    const config = DRAWER_CONFIG(drawerLayer.value);
    //@ts-ignore
    const drawer = new L.Control.Draw(config);
    //@ts-ignore
    L.drawLocal = DRAWER_LOCAL;
    map.value.addControl(drawer).addLayer(drawerLayer.value);
    //@ts-ignore
    map.value.addEventListener(L.Draw.Event.CREATED, (e: any) => {
      e.layer.addTo(drawerLayer.value);
    });
  };
  const adjustMap = (center: L.LatLngExpression, zoom) => {
    map.value.flyTo(center, zoom);
  };
  const adjustTileUrl = (tileUrl: string) => {
    tile.value.setUrl(tileUrl);
  };
  const adjustTileFilter = (filters: any) => {
    if (element.value instanceof HTMLElement) {
      element.value.style.filter = Object.keys(filters).reduce((prev, key) => {
        const cur = ` ${key}(${filters[key]}${TILE_FILTER_OPTIONS[key]["unit"]})`;
        return (prev += cur);
      }, "");
    }
  };
  return {
    map,
    tile,
    drawerLayer,
    initDrawer,
    adjustMap,
    adjustTileUrl,
    adjustTileFilter,
  };
}
