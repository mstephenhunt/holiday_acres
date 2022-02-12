import { FeedType, FeedUnit } from "./types";

export const feedUnitToLabelMap: Map<FeedUnit, string> = new Map([
  [FeedUnit.SCOOP, "Scoop"],
  [FeedUnit.HANDFUL, "Handful"],
  [FeedUnit.FIRST_CUT, "First Cut"],
  [FeedUnit.SECOND_CUT, "Second Cut"],
]);

export const feedTypeToLabelMap: Map<FeedType, string> = new Map([
  [FeedType.PELLETS, "Pellets"],
  [FeedType.HAY_PELLETS, "Hay Pellets"],
  [FeedType.HAY_CUT, "Hay Cut"],
  [FeedType.FIBREMAX, "Fibremax"],
  [FeedType.ALFALFA, "PM Alfalfa"],
  [FeedType.CARB_SAFE, "Carb Safe"],
  [FeedType.OIL, "Oil"],
]);

// Is this being used?
export const feedLabelToTypeMap: Map<string, FeedType> = new Map([
  ["Pellets", FeedType.PELLETS],
  ["Hay Pellets", FeedType.HAY_PELLETS],
  ["Hay Cut", FeedType.HAY_CUT],
  ["Fibremax", FeedType.FIBREMAX],
  ["PM Alfalfa", FeedType.ALFALFA],
  ["Carb Safe", FeedType.CARB_SAFE],
  ["Oil", FeedType.OIL],
]);
