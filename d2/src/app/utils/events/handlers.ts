import { BLOCK_LAYER_ID, BLOCK_LAYER_SOURCE_ID } from "@/app/constants/layers";
import { MutableRefObject, useEffect } from "react";
import type { Map, MapGeoJSONFeature } from "maplibre-gl";
import { ZoneStore } from "@/app/store/zoneStore";
export const HighlightFeature = (
  features: Array<MapGeoJSONFeature> | undefined,
  map: MutableRefObject<Map | null>,
  zoneStoreRef: MutableRefObject<ZoneStore | null>
) => {
  features?.forEach((feature) => {
    map.current?.setFeatureState(
      {
        source: BLOCK_LAYER_ID,
        id: feature?.id ?? undefined,
        sourceLayer: BLOCK_LAYER_SOURCE_ID,
      },
      { hover: true }
    );
  });
  const geoids: Set<string> = new Set(
    features?.map((feature) => feature.properties?.GEOID20)
  );
  // zoneStoreRef.setZoneAssignments(zoneStoreRef.selectedZone, geoids);
  if (features?.length) {
    zoneStoreRef.current?.setZoneAssignments(
      zoneStoreRef.current?.selectedZone,
      geoids
    );
  }
};

const unhighlightFeature = (
  map: MutableRefObject<Map | null>,
  highlightedFeature: MutableRefObject<number | null>
  //   filterStoreRef: MutableRefObject<FilterStore | null>
) => {
  if (highlightedFeature.current) {
    map.current?.setFeatureState(
      {
        source: BLOCK_LAYER_ID,
        id: highlightedFeature.current ?? undefined,
        sourceLayer: BLOCK_LAYER_SOURCE_ID,
      },
      { hover: false }
    );
    // filterStoreRef.current?.setSelectedEdge(undefined);
  }
};
