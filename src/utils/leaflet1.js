import L from "leaflet";
import geojsonArea from "@mapbox/geojson-area";
import polygonCenter from "geojson-polygon-center";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import {
  createDrawerConfig,
  createDrawerLocal,
  layerToGeoJSON,
} from "@/utils/leaflet.utils.js";
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

class Leaflet {
  constructor(container) {
    L.drawLocal = createDrawerLocal();
  }
  createMap(container) {
    L.drawLocal = createDrawerLocal();
    this.map = L.map(container, {
      minZoom: 3,
      maxZoom: 20,
      center: [26.342523, 119.840262],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
      crs: L.CRS.EPSG3857,
    });
    L.tileLayer(url).addTo(this.map);
    return this.map;
  }
  createLayer() {
    const layer = new L.layerGroup();
    this.map.addLayer(layer);
    return layer;
  }
  removeLayer(layer) {
    this.map.removeLayer(layer);
  }
  createDrawerControl() {
    return new Promise((resolve) => {
      const editableLayers = new L.FeatureGroup();
      const config = createDrawerConfig(editableLayers);
      this.drawerControl = new L.Control.Draw(config);
      this.map.addControl(this.drawerControl);
      this.map.on("draw:created", (e) => {
        const geoJson = layerToGeoJSON(e.layer);
        resolve(geoJson);
      });
    });
  }
  removeDrawerControl() {
    if (this.drawerControl && this.map) {
      this.map.removeControl(this.drawerControl);
    }
  }
  loadGeoJSON(geoJSON) {
    return L.geoJSON(geoJSON, {
      style: { color: "#33b18a" },
    });
  }
}

export default Leaflet;
