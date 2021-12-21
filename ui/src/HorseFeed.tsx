import { FeedType, FeedUnit, Feed } from "./types";
import GrainIcon from "@mui/icons-material/Grain";
import GrassIcon from "@mui/icons-material/Grass";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import SpaIcon from "@mui/icons-material/Spa";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import OpacityIcon from "@mui/icons-material/Opacity";
import CircleIcon from "@mui/icons-material/Circle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const feedNameFormatMap: Map<FeedType, string> = new Map([
  [FeedType.PELLETS, "Pellets"],
  [FeedType.HAY_PELLETS, "Hay Pellets"],
  [FeedType.HAY_CUT, "Hay Cut"],
  [FeedType.FIBREMAX, "Fibremax"],
  [FeedType.ALFALFA, "PM Alfalfa"],
  [FeedType.CARB_SAFE, "Carb Safe"],
  [FeedType.OIL, "Oil"],
]);

function getFormattedFeedAmount(input: {
  feedUnit: FeedUnit
  feedAmount?: number
}): string {
  const { feedUnit, feedAmount } = input;

  if (feedUnit == FeedUnit.SCOOP && feedAmount) {
    if (feedAmount > 1) {
      return `${feedAmount} Scoops`;
    } else {
      return `${feedAmount} Scoop`;
    }
  } else if (feedUnit == FeedUnit.HANDFUL && feedAmount) {
    if (feedAmount > 1) {
      return `${feedAmount} Handfuls`;
    } else {
      return `${feedAmount} Handful`;
    }
  } else if (feedUnit == FeedUnit.FIRST_CUT) {
    return "First Cut";
  } else if (feedUnit == FeedUnit.SECOND_CUT) {
    return "Second Cut";
  } else {
    return "";
  }
}


function getIconForFeedType(input: FeedType) {
  // TODO For some reason, this was being evaluated as a string. Force-typing
  // it to a FeedType
  const feedType: FeedType = FeedType[input] as unknown as FeedType;

  if (feedType == FeedType.PELLETS) {
    return <GrainIcon />;
  }
  if (feedType == FeedType.HAY_PELLETS) {
    return <GrassIcon />;
  }
  if (feedType == FeedType.HAY_CUT) {
    return <ContentCutIcon />;
  }
  if (feedType == FeedType.FIBREMAX) {
    return <SpaIcon />;
  }
  if (feedType == FeedType.ALFALFA) {
    return <FormatColorFillIcon />;
  }
  if (feedType == FeedType.CARB_SAFE) {
    return <BakeryDiningIcon />;
  }
  if (feedType == FeedType.OIL) {
    return <OpacityIcon />;
  } else {
    return <CircleIcon />;
  }
}

export default function HorseFeed(props: Feed) {
  // TODO: For some reason, the props aren't typed passed in which is breaking the helpers
  // evaluating what their values are. They're being cast in this function but we shouldn't
  // need to do that.
  const icon = getIconForFeedType(props.feed_type as FeedType);
  const feedName =
    feedNameFormatMap.get(FeedType[props.feed_type] as unknown as FeedType) || "Unknown Feed";

  const feedAmount = getFormattedFeedAmount({ feedAmount: props.amount, feedUnit: FeedUnit[props.unit] as unknown as FeedUnit});

  return (
    <Grid container xs={12}>
      <Grid item xs={7}>
        <Box sx={{ borderRight: 1, height: 0.75, borderColor: "#C4C4C4" }}>
          <Grid container>
            <Grid item xs={2}>
              {icon}
            </Grid>
            <Grid item xs={10}>
              <Typography>{feedName}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={5} sx={{ color: "#606060" }}>
        <Typography sx={{ marginLeft: 1 }}>{feedAmount}</Typography>
      </Grid>
    </Grid>
  );
}
