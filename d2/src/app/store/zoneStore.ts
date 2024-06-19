import { create } from "zustand";
import { Zone, GEOID, ZoneDict } from "../constants/types";

export interface ZoneStore {
  selectedZone: Zone;
  setSelectedZone: (zone: Zone) => void;
  zoneAssignments: ZoneDict;
  setZoneAssignments: (
    // zoneAssignments: ZoneDict,
    zone: Zone,
    geoids: Array<GEOID>
  ) => void;
}

export const useZoneStore = create<ZoneStore>((set) => ({
  selectedZone: 1,
  setSelectedZone: (zone: Zone) => set({ selectedZone: zone }),
  zoneAssignments: {},
  // setZoneAssignments should reference existing dict,
  // and accept a zone id and a list of geoids to add to the list.
  // if the geoids exist in other key lists, they must be removed from those lists.
  setZoneAssignments: (
    // zoneAssignments: ZoneDict,
    zone: Zone,
    geoids: Array<GEOID>
  ) =>
    set((state) => ({
      zoneAssignments: {
        ...state.zoneAssignments,
        [zone]: [...geoids], // Update assignments for specific zone
      },
    })),
}));
