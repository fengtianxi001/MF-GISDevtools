import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { DEFAULT_OPTIONS, TILE_FILTER_OPTIONS } from "@/configs/leaflet";
import { onMounted, ref, Ref, reactive, watch } from "vue";
export function useLeaflet(element: Ref<HTMLElement | null | undefined>) {
  const map = ref<L.Map | undefined>();
  const tile = ref<L.TileLayer | undefined>();
  const drawerLayer = ref<L.FeatureGroup | undefined>();
  const mapOptions = reactive({
    zoom: DEFAULT_OPTIONS.ZOOM,
    center: [...(DEFAULT_OPTIONS.CENTER as [number, number])] as [number, number]
  });
  const tileOptions = reactive({
    url: DEFAULT_OPTIONS.TILE_URL,
    tileFilterOptions: { ...DEFAULT_OPTIONS.TILE_FILTER },
  });
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
  watch([mapOptions], () => {
    if (map.value) {
      map.value.flyTo(mapOptions.center, mapOptions.zoom);
    }
  });
  watch([tileOptions], () => {
    const { url, tileFilterOptions } = tileOptions;
    //@ts-ignore
    if (url !== tile.value._url) {
      tile.value.setUrl(url);
    }
    if (element.value instanceof HTMLElement) {
      element.value.style.filter = Object.keys(tileFilterOptions).reduce(
        (prev, key) => {
          const cur = ` ${key}(${tileFilterOptions[key]}${TILE_FILTER_OPTIONS[key]["unit"]})`;
          return (prev += cur);
        },
        ""
      );
    }
  });
  const resetMapOptions = () => {
    console.log(DEFAULT_OPTIONS.ZOOM);
    mapOptions.zoom = DEFAULT_OPTIONS.ZOOM;
    mapOptions.center = [...(DEFAULT_OPTIONS.CENTER as [number, number])] as [number, number]
    console.log("mapOptions", mapOptions);
  };
  const resetTileOptions = () => {
    tileOptions.url = DEFAULT_OPTIONS.TILE_URL;
    tileOptions.tileFilterOptions = { ...DEFAULT_OPTIONS.TILE_FILTER };
  };
  return {
    map,
    tile,
    mapOptions,
    tileOptions,
    resetMapOptions,
    resetTileOptions,
  };
}
