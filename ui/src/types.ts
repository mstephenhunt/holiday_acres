export enum FeedType {
  PELLETS,
  FIBREMAX,
  ALFALFA,
  CARB_SAFE,
  OIL,
  HAY_PELLETS,
  HAY_CUT,
}

export enum FeedUnit {
  SCOOP,
  HANDFUL,
  FIRST_CUT,
  SECOND_CUT,
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
};

export type BarnSectionType = {
  id: number;
  name: string;
  horses: Horse[];
};
