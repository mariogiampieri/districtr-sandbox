import { VectorSourceSpecification } from "maplibre-gl";

export const BLOCKS_SOURCE: VectorSourceSpecification = {
  type: "vector",
  tiles: ["https://pmt.basemapper.app/t6/{z}/{x}/{y}.mvt"],
};
