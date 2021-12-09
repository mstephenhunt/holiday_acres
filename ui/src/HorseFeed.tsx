import { FeedType, FeedUnit, Feed } from './types';
import GrainIcon from '@mui/icons-material/Grain';
import GrassIcon from '@mui/icons-material/Grass';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import SpaIcon from '@mui/icons-material/Spa';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import OpacityIcon from '@mui/icons-material/Opacity';
import CircleIcon from '@mui/icons-material/Circle';

const feedTypeMap: Map<FeedType, string> = new Map([
  [FeedType.PELLETS, 'GrainIcon'],
  [FeedType.HAY_PELLETS, 'GrassIcon'],
  [FeedType.HAY_CUT, 'ContentCutIcon'],
  [FeedType.FIBREMAX, 'SpaIcon'],
  [FeedType.ALFALFA, 'FormatColorFillIcon'],
  [FeedType.CARB_SAFE, 'BakeryDiningIcon'],
  [FeedType.OIL, 'OpacityIcon']
]);

function getIconForFeedType(feedType: FeedType) {
  if (feedType == FeedType.PELLETS) {
    return <GrainIcon />
  } if (feedType == FeedType.HAY_PELLETS) {
    return <GrassIcon />
  } if (feedType == FeedType.HAY_CUT) {
    return <ContentCutIcon />
  } if (feedType == FeedType.FIBREMAX) {
    return <SpaIcon />
  } if (feedType == FeedType.ALFALFA) {
    return <FormatColorFillIcon />
  } if (feedType == FeedType.CARB_SAFE) {
    return <BakeryDiningIcon />
  } if (feedType == FeedType.OIL) {
    return <OpacityIcon />
  } else {
    return <CircleIcon />
  }
};

export default function HorseFeed(props: Feed) {
  const icon = getIconForFeedType(props.type);

  return (
    icon
  );
}
