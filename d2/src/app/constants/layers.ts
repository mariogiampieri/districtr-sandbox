import { ExpressionSpecification, LayerSpecification } from "maplibre-gl";
import { MutableRefObject } from "react";
import { Map } from "maplibre-gl";
import { BLOCKS_SOURCE } from "./sources";

export const BLOCK_LAYER_ID = "blocks";
export const BLOCK_LAYER_SOURCE_ID = "co_blocks_wgs4fgb";
export const DEFAULT_PAINT_STYLE: ExpressionSpecification = [
  "case",
  ["boolean", ["feature-state", "hover"], false],
  "#FF0000",
  "#000000",
];

export const ZONE_ASSIGNMENT_STYLE: ExpressionSpecification = [
  // reference the zone store; if the feature is in the zone array, color it based on the color corresponding with zone id
  "match",
  ["get", "zone"],
  1,
  "#FF0000",
  2,
  "#00FF00",
  3,
  "#0000FF",
  4,
  "#FFFF00",
  5,
  "#FF00FF",
  "#FF00FF",
];

export const BLOCKS_LAYER: LayerSpecification = {
  id: BLOCK_LAYER_ID,
  source: BLOCK_LAYER_ID,
  "source-layer": BLOCK_LAYER_SOURCE_ID,
  type: "line",
  paint: {
    "line-opacity": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      1,
      0.8,
    ],

    "line-color": "#cecece",
  },
};

export const BLOCKS_HOVER_LAYER: LayerSpecification = {
  id: `${BLOCK_LAYER_ID}-hover`,
  source: BLOCK_LAYER_ID,
  "source-layer": BLOCK_LAYER_SOURCE_ID,
  type: "fill",
  paint: {
    "fill-opacity": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      0.8,
      0.2,
    ],

    "fill-color": "#ff00ff",
  },
};

const addLayer = (map: MutableRefObject<Map | null>) => {
  map.current?.addSource(BLOCK_LAYER_ID, BLOCKS_SOURCE);
  map.current?.addLayer(BLOCKS_LAYER);

  map.current?.addLayer(BLOCKS_HOVER_LAYER);
};

const removeLayer = (map: MutableRefObject<Map | null>) => {
  map.current?.removeLayer(BLOCK_LAYER_ID);
  map.current?.removeSource(BLOCK_LAYER_ID);
};

export { addLayer, removeLayer };
