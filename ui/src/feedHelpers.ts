import { FeedType } from './types';

export const feedTypeToLabelMap: Map<FeedType, string> = new Map([
  [FeedType.PELLETS, "Pellets"],
  [FeedType.HAY_PELLETS, "Hay Pellets"],
  [FeedType.HAY_CUT, "Hay Cut"],
  [FeedType.FIBREMAX, "Fibremax"],
  [FeedType.ALFALFA, "PM Alfalfa"],
  [FeedType.CARB_SAFE, "Carb Safe"],
  [FeedType.OIL, "Oil"],
]);

export const feedLabelToTypeMap: Map<string, FeedType> = new Map([
  ["Pellets", FeedType.PELLETS],
  ["Hay Pellets", FeedType.HAY_PELLETS],
  ["Hay Cut", FeedType.HAY_CUT],
  ["Fibremax", FeedType.FIBREMAX],
  ["PM Alfalfa", FeedType.ALFALFA],
  ["Carb Safe", FeedType.CARB_SAFE],
  ["Oil", FeedType.OIL],
]);
