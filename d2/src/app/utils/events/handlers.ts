import { BLOCK_LAYER_ID, BLOCK_LAYER_SOURCE_ID } from "@/app/constants/layers";
import { MutableRefObject, useEffect } from "react";
import type { Map, MapGeoJSONFeature } from "maplibre-gl";
import { ZoneStore } from "@/app/store/zoneStore";
export const HighlightFeature = (
  features: Array<MapGeoJSONFeature> | undefined,
  map: MutableRefObject<Map | null>,
  zoneStore: ZoneStore,
) => {
  features?.forEach((feature) => {
    map.current?.setFeatureState(
      {
        source: BLOCK_LAYER_ID,
        id: feature?.id ?? undefined,
        sourceLayer: BLOCK_LAYER_SOURCE_ID,
      },
      { hover: true, zone: Number(zoneStore.selectedZone) },
    );
  });
  const geoids = features?.map((feature) => feature.properties?.GEOID20) ?? [];
  if (features?.length) {
    zoneStore.setZoneAssignments(zoneStore.selectedZone, geoids);
  }
};

const unhighlightFeature = (
  map: MutableRefObject<Map | null>,
  highlightedFeature: MutableRefObject<number | null>,
  //   filterStoreRef: MutableRefObject<FilterStore | null>
) => {
  if (highlightedFeature.current) {
    map.current?.setFeatureState(
      {
        source: BLOCK_LAYER_ID,
        id: highlightedFeature.current ?? undefined,
        sourceLayer: BLOCK_LAYER_SOURCE_ID,
      },
      { hover: false },
    );
    // filterStoreRef.current?.setSelectedEdge(undefined);
  }
};
