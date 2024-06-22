import { create } from "zustand";
import { Zone, GEOID, ZoneDict } from "../constants/types";
// import * as duckdb from "@duckdb/duckdb-wasm";

export interface ZoneStore {
  selectedZone: Zone;
  setSelectedZone: (zone: Zone) => void;
  zoneAssignments: ZoneDict;
  setZoneAssignments: (
    zone: Zone,
    geoids: Array<GEOID>,
    // db: duckdb.AsyncDuckDB,
  ) => void;
}

export const useZoneStore = create<ZoneStore>((set) => ({
  selectedZone: 1,
  setSelectedZone: (zone: Zone) => set({ selectedZone: zone }),
  zoneAssignments: new Map(),
  setZoneAssignments: (
    zone: Zone,
    geoids: Array<GEOID>,
    // db: duckdb.AsyncDuckDB,
  ) =>
    set((state) => {
      const newZoneAssignments = new Map(state.zoneAssignments);
      geoids.forEach((geoid) => {
        newZoneAssignments.set(geoid, zone);
      });
      // insertZoneAssignments(zone, geoids, db);
      return { zoneAssignments: newZoneAssignments };
    }),
}));
