"use client";
import type { MutableRefObject } from "react";
import React, { useEffect, useRef, useState } from "react";
import type { Map } from "maplibre-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MAP_CENTER, MAP_TILES } from "../constants/configuration";
import { addLayer } from "../constants/layers";

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
  }, []);

  return <div className="h-full w-full" ref={mapContainer} />;
};
