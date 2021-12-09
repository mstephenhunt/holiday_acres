import { FeedType } from './types';
import Icon from '@mui/material/Icon';

/**
 * Amount and unit are optional because there are some feed types that
 * don't require any amount associated (like which cut of hay).
 */
type HorseFeedProps = {
  type: FeedType,
  amount?: number,
  unit?: number
};

const feedTypeMap: Map<FeedType, string> = new Map([
  [FeedType.PELLETS, 'GrainIcon'],
  [FeedType.HAY_PELLETS, 'GrassIcon'],
  [FeedType.HAY_CUT, 'ContentCutIcon'],
  [FeedType.FIBREMAX, 'SpaIcon'],
  [FeedType.ALFALFA, 'FormatColorFillIcon'],
  [FeedType.CARB_SAFE, 'BakeryDiningIcon'],
  [FeedType.OIL, 'OpacityIcon']
]);

export default function HorseFeed(props: HorseFeedProps) {
  const feedIcon = feedTypeMap.get(props.type);

  return (
    <Icon>{feedIcon}</Icon>
  );
}
