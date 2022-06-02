export type tileFilterkey =
  | "blur"
  | "brightness"
  | "contrast"
  | "grayscale"
  | "hue-rotate"
  | "opacity"
  | "invert"
  | "saturate"
  | "sepia";

export type tileFilterOptionsType = {
  [key in tileFilterkey]?: number;
};

export type tileFilterUnitType = {
  [key in tileFilterkey]: string;
};

export interface tileOptionsType {
  url: string;
  tileFilterOptions?: tileFilterOptionsType;
}

export interface mapOptionsType extends L.MapOptions {
  zoom: number;
  centerLat: number,
  centerLng: number,
  zoomAble?: boolean;
}

export interface leafletOptionsType {
  tileOptions: tileOptionsType;
  mapOptions: mapOptionsType;
}
