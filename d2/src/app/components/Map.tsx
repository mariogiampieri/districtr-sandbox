"use client";
import type { MutableRefObject } from "react";
import React, { useEffect, useRef, useState } from "react";
import type { Map } from "maplibre-gl";
import {
  GeoJSONSource,
  LngLatLike,
  MapLayerMouseEvent,
  MapLayerTouchEvent,
  PointLike,
} from "maplibre-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MAP_CENTER, MAP_TILES } from "../constants/configuration";
import { BLOCK_LAYER_ID, addLayer } from "../constants/layers";
import { highlightFeature } from "../utils/events/handlers";

export const MapComponent: React.FC = () => {
  const map: MutableRefObject<Map | null> = useRef(null);
  const mapContainer: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: MAP_TILES,
      center: MAP_CENTER, // starting position [lng, lat]
      zoom: 6.75, // starting zoom
      maxZoom: 18,
    });
    map.current.dragRotate.disable();
    map.current.on("load", () => {
      setMapLoaded(true);
      addLayer(map);
      console.log(map.current?.getStyle());
    });

    map.current.on(
      "mousemove",
      "blocks-hover",
      (e: MapLayerMouseEvent | MapLayerTouchEvent) => {
        const bbox: [PointLike, PointLike] = [
          [e.point.x - 50, e.point.y - 50],
          [e.point.x + 50, e.point.y + 50],
        ];
        // Find features intersecting the bounding box.
        const selectedFeatures = map.current?.queryRenderedFeatures(bbox, {
          layers: [BLOCK_LAYER_ID],
        });
        // console.log(selectedFeatures);
        highlightFeature(selectedFeatures, map);
      }
    );
  }, []);

  return <div className="h-full w-full" ref={mapContainer} />;
};
