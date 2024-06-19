import { BLOCK_LAYER_ID, BLOCK_LAYER_SOURCE_ID } from "@/app/constants/layers";
import { MutableRefObject, useEffect } from "react";
import type { Map, MapGeoJSONFeature } from "maplibre-gl";

export const highlightFeature = (
  features: Array[MapGeoJSONFeature] | undefined,
  map: MutableRefObject<Map | null>
  //   highlightedFeature: MutableRefObject<number | null>
  //   filterStoreRef: MutableRefObject<FilterStore | null>
) => {
  //   if (!feature) {
  //     unhighlightFeature(map, highlightedFeature);
  //     highlightedFeature.current = null;
  //     return;
  //   }
  //   const newFeatureId = feature.id;
  //   if (highlightedFeature.current === newFeatureId) {
  //     return;
  //   }
  //   unhighlightFeature(map, highlightedFeature);

  //   highlightedFeature.current = (newFeatureId as number) ?? null;
  //   filterStoreRef.current?.setSelectedEdge(feature);
  features?.forEach((feature) => {
    map.current?.setFeatureState(
      {
        source: BLOCK_LAYER_ID,
        id: feature?.id ?? undefined,
        sourceLayer: BLOCK_LAYER_SOURCE_ID,
      },
      { hover: true }
    );
    // console.log(feature);
  });
  //   console.log(map.current?.getStyle());
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
