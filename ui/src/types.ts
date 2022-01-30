export enum FeedType {
  PELLETS = "PELLETS",
  FIBREMAX = "FIBREMAX",
  ALFALFA = "ALFALFA",
  CARB_SAFE = "CARB_SAFE",
  OIL = "OIL",
  HAY_PELLETS = "HAY_PELLETS",
  HAY_CUT = "HAY_CUT",
}

export enum FeedUnit {
  SCOOP = "SCOOP",
  HANDFUL = "HANDFUL",
  FIRST_CUT = "FIRST_CUT",
  SECOND_CUT = "SECOND_CUT",
}

export type Feed = {
  id: number;
  feed_type: FeedType;
  amount?: number;
  unit: FeedUnit;
};

export type Horse = {
  id: number;
  name: string;
  feed: Feed[];
  stall: string;
  special_instructions?: string;
};

export type BarnSectionType = {
  id: number;
  name: string;
  horses: Horse[];
};
