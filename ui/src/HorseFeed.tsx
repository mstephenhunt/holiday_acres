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

function getFormattedFeedAmount(
  feedAmount?: number,
  feedUnit: FeedUnit
): string {
  if (feedUnit === undefined) {
    return "";
  } else if (feedUnit == FeedUnit.SCOOP) {
    if (feedAmount > 1) {
      return `${feedAmount} Scoops`;
    } else {
      return `${feedAmount} Scoop`;
    }
  } else if (feedUnit == FeedUnit.HANDFUL) {
    if (feedAmount > 1) {
      return `${feedAmount} Handfuls`;
    } else {
      return `${feedAmount} Handful`;
    }
  } else if (feedUnit == FeedUnit.FIRST_CUT) {
    return "First Cut";
  } else if (feedUnit == FeedUnit.SECOND_CUT) {
    return "Second Cut";
  }
}

function getIconForFeedType(feedType: FeedType) {
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
  const icon = getIconForFeedType(props.type);
  const feedName = feedNameFormatMap.get(props.type) || "Unknown Feed";
  const feedAmount = getFormattedFeedAmount(props.amount, props.unit);

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
