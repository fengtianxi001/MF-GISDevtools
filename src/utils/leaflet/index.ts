import L from "leaflet";
import geojsonArea from "@mapbox/geojson-area";
import polygonCenter from "geojson-polygon-center";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import {
  TILE_LAYER_URLS,
  DRAWER_LOCAL,
  DRAWER_CONFIG,
} from "@/configs/leaflet";

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
  initDrawer() {
    const editableLayers = new L.FeatureGroup();
    const config = DRAWER_CONFIG(editableLayers);
    // const layerGroup = new L.LayerGroup();
    //@ts-ignore
    const drawer = new L.Control.Draw(config);
    //@ts-ignore
    L.drawLocal = DRAWER_LOCAL;
    this.map.addControl(drawer).addLayer(editableLayers);
    //@ts-ignore
    this.map.addEventListener(L.Draw.Event.CREATED, (e: any) => {
      e.layer.addTo(editableLayers);
    });
    return drawer;
  }
}

export default Leaflet;
