// create a type for the drawn zone, ascending int
export type Zone = number;

export type GEOID = string;

// create a dict of zone: [geoid]
export type ZoneDict = Record<Zone, GEOID[]>;

export const COLORS: string[] = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FFA500",
  "#800080",
  "#008000",
  "#000080",
  "#800000",
  "#808000",
  "#008080",
  "#808080",
  "#C0C0C0",
  "#FFD700",
  "#A52A2A",
  "#800000",
  "#FF4500",
  "#DA70D6",
  "#FF8C00",
  "#FF69B4",
  "#FF1493",
  "#FF6347",
];
