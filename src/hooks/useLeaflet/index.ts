import { nextTick, onMounted, reactive, ref, Ref } from "vue";
import {
  leafletOptionsType,
  tileFilterUnitType,
  tileFilterkey,
  tileOptionsType,
  mapOptionsType,
} from "./types";
import { forEach, reduce } from "lodash-es";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
const FILTER_UNIT: tileFilterUnitType = {
  blur: "px",
  brightness: "%",
  contrast: "%",
  grayscale: "%",
  "hue-rotate": "deg",
  opacity: "%",
  invert: "%",
  saturate: "%",
  sepia: "%",
} as const;

export function useLeaflet(
  container: Ref<HTMLElement | null | undefined>,
  leafletOptions: leafletOptionsType
) {
  const map = ref<L.Map | undefined>();
  const tile = ref<L.TileLayer | undefined>();
  const refreshTileOptions = (tileOptions: tileOptionsType) => {
    if (tile.value) {
      //@ts-ignore
      if (tile.value?._url !== tileOptions.url) {
        tile.value.setUrl(tileOptions.url);
      }

      if (tileOptions.tileFilterOptions) {
        const element = document.querySelector(".leaflet-layer") as HTMLElement;
        let filter = "";
        forEach(tileOptions.tileFilterOptions, (value, key) => {
          const unit = FILTER_UNIT[key as tileFilterkey];
          filter += ` ${key}(${value + unit})`;
        });
        element.style.filter = filter;
      }
    }
  };
  const refreshMapOptions = (mapOptions: mapOptionsType) => {
    if (map.value instanceof L.Map) {
      map.value.setZoom(mapOptions.zoom);
      map.value.setView(mapOptions.center);
    }
  };
  onMounted(() => {
    if (container.value instanceof HTMLElement) {
      const { mapOptions, tileOptions } = leafletOptions;
      const center = [mapOptions.centerLat, mapOptions.centerLng];
      map.value = L.map(
        container.value,
        Object.assign(
          { attributionControl: false, zoomControl: false },
          { center },
          mapOptions
        )
      );
      if (mapOptions.zoomAble !== undefined && !mapOptions.zoomAble) {
        map.value.scrollWheelZoom.disable();
      }
      tile.value = L.tileLayer(tileOptions.url);
      map.value.addLayer(tile.value);
      nextTick(() => {
        refreshTileOptions(tileOptions);
      });
    }
  });
  return {
    map,
    tile,
    refreshMapOptions,
    refreshTileOptions,
  };
}
