import { BLOCK_LAYER_ID, BLOCK_LAYER_SOURCE_ID } from "@/app/constants/layers";
import { MutableRefObject, useEffect } from "react";
import type { Map, MapGeoJSONFeature } from "maplibre-gl";
import { ZoneStore } from "@/app/store/zoneStore";
import * as duckdb from "@duckdb/duckdb-wasm";
import { Zone, GEOID } from "../../constants/types";

export const HighlightFeature = (
  features: Array<MapGeoJSONFeature> | undefined,
  map: MutableRefObject<Map | null>,
  zoneStore: ZoneStore,
  db: MutableRefObject<duckdb.AsyncDuckDB | null>,
) => {
  const geoids: Set<string> = new Set(
    features?.map((feature) => feature.properties?.GEOID20),
  );
  if (features?.length && db !== null) {
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
    zoneStore.setZoneAssignments(
      zoneStore.selectedZone,
      geoids,
      // db.current,
    );
    insertZoneAssignments(zoneStore.selectedZone, geoids, db.current);
  }
};

const insertZoneAssignments = async (
  zone: Zone,
  geoids: Array<GEOID>,
  db: duckdb.AsyncDuckDB,
) => {
  const c = await db.connect();
  let inserts: string[] = [];
  geoids.forEach((geoid) => {
    inserts.push(`('${geoid}', ${zone})`);
  });
  try {
    await c.query(
      `INSERT INTO assignments (geoid, zone) VALUES ${inserts.join(", ")};`,
    );
  } catch (e) {
    console.log("Error inserting assignments", e);
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
