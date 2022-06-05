import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { TILE_LAYER_URLS } from "@/configs/leaflet";

class Leaflet {
  element: HTMLElement;
  map: L.Map;
  tile: L.TileLayer;
  constructor(element: HTMLElement) {
    this.element = element;
    this.map = this.initMap();
    this.tile = this.initTileLayer();
  }
  initMap(): L.Map {
    return L.map(this.element, {
      center: [26.342523, 119.840262],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
      crs: L.CRS.EPSG3857,
    });
  }
  initTileLayer(): L.TileLayer {
    const url = TILE_LAYER_URLS.STREET.value;
    return L.tileLayer(url).addTo(this.map);
  }
}

export default Leaflet;
