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
  type: FeedType;
  amount?: number;
  unit: FeedUnit;
};
