import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { DEFAULT_OPTIONS, TILE_FILTER_OPTIONS } from "@/configs/leaflet";
import { onMounted, shallowRef, Ref, reactive, watch, computed } from "vue";
export function useLeaflet(element: Ref<HTMLElement | null | undefined>) {
  const map = shallowRef<L.Map | undefined>();
  const tile = shallowRef<L.TileLayer | undefined>();
  const mapOptions = reactive({
    zoom: DEFAULT_OPTIONS.ZOOM,
    center: [...(DEFAULT_OPTIONS.CENTER as [number, number])] as [
      number,
      number
    ],
  });
  const tileOptions = reactive({
    url: DEFAULT_OPTIONS.TILE_URL,
    tileFilterOptions: { ...DEFAULT_OPTIONS.TILE_FILTER },
  });
  const resetMapOptions = () => {
    mapOptions.zoom = DEFAULT_OPTIONS.ZOOM;
    mapOptions.center = [...(DEFAULT_OPTIONS.CENTER as [number, number])] as [
      number,
      number
    ];
  };
  const resetTileOptions = () => {
    tileOptions.url = DEFAULT_OPTIONS.TILE_URL;
    tileOptions.tileFilterOptions = { ...DEFAULT_OPTIONS.TILE_FILTER };
  };
  const generalOptions = computed(() => {
    const result = {
      地图配置: mapOptions,
      地图瓦片: tileOptions.url,
      地图滤镜: element.value.style.filter?.split(" "),
    };
    return JSON.stringify(result, null, 4);
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
  return {
    map,
    tile,
    mapOptions,
    tileOptions,
    generalOptions,
    resetMapOptions,
    resetTileOptions,
  };
}
