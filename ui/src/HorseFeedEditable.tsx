import { FeedType, FeedUnit } from "./types";
import { feedTypeToLabelMap, feedUnitToLabelMap } from "./feedHelpers";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CancelIcon from '@mui/icons-material/Cancel';

type HorseFeedEditableComponentProps = {
  id: number;
  feedType: FeedType;
  feedAmount: number;
  feedUnit: string;
  feedRowUpdateHandler: Function;
  feedRowDeleteHandler: Function;
};

export default function HorseFeedEditable(
  props: HorseFeedEditableComponentProps
) {
  const handleFeedTypeChange = (event: SelectChangeEvent) => {
    props.feedRowUpdateHandler({
      id: props.id,
      feedType: event.target.value as FeedType,
      feedAmount: props.feedAmount,
      feedUnit: props.feedUnit,
    });
  };

  const handleFeedAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.feedRowUpdateHandler({
      id: props.id,
      feedType: props.feedType,
      feedAmount: event.target.valueAsNumber,
      feedUnit: props.feedUnit,
    });
  };

  const handleFeedUnitChange = (event: SelectChangeEvent) => {
    props.feedRowUpdateHandler({
      id: props.id,
      feedType: props.feedType,
      feedAmount: props.feedAmount,
      feedUnit: event.target.value as FeedUnit,
    });
  };

  return (
    <Grid container sx={{ paddingTop: "5px" }}>
      <Grid item xs={5}>
        <Box>
          <FormControl fullWidth>
            <Select
              labelId="feed-select-label"
              // id="demo-simple-select" // what is this for?
              value={props.feedType}
              onChange={handleFeedTypeChange}
            >
              <MenuItem value={FeedType.PELLETS}>
                {feedTypeToLabelMap.get(FeedType.PELLETS)}
              </MenuItem>
              <MenuItem value={FeedType.HAY_PELLETS}>
                {feedTypeToLabelMap.get(FeedType.HAY_PELLETS)}
              </MenuItem>
              <MenuItem value={FeedType.HAY_CUT}>
                {feedTypeToLabelMap.get(FeedType.HAY_CUT)}
              </MenuItem>
              <MenuItem value={FeedType.FIBREMAX}>
                {feedTypeToLabelMap.get(FeedType.FIBREMAX)}
              </MenuItem>
              <MenuItem value={FeedType.ALFALFA}>
                {feedTypeToLabelMap.get(FeedType.ALFALFA)}
              </MenuItem>
              <MenuItem value={FeedType.CARB_SAFE}>
                {feedTypeToLabelMap.get(FeedType.CARB_SAFE)}
              </MenuItem>
              <MenuItem value={FeedType.OIL}>
                {feedTypeToLabelMap.get(FeedType.OIL)}
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={2} sx={{ paddingLeft: "5px", paddingRight: "5px" }}>
        <TextField
          id="outlined-number"
          value={props.feedAmount}
          type="number"
          onChange={handleFeedAmountChange}
        />
      </Grid>
      <Grid item xs={4}>
        <Box>
          <FormControl fullWidth>
            <Select
              labelId="feed-select-label"
              // id="demo-simple-select" // what is this for?
              value={props.feedUnit}
              onChange={handleFeedUnitChange}
            >
              <MenuItem value={FeedUnit.SCOOP}>
                {feedUnitToLabelMap.get(FeedUnit.SCOOP)}
              </MenuItem>
              <MenuItem value={FeedUnit.HANDFUL}>
                {feedUnitToLabelMap.get(FeedUnit.HANDFUL)}
              </MenuItem>
              <MenuItem value={FeedUnit.FIRST_CUT}>
                {feedUnitToLabelMap.get(FeedUnit.FIRST_CUT)}
              </MenuItem>
              <MenuItem value={FeedUnit.SECOND_CUT}>
                {feedUnitToLabelMap.get(FeedUnit.SECOND_CUT)}
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={1}>
        <CancelIcon
          color="action"
          sx={{ marginTop: '15px', marginLeft: '7px' }}
          onClick={() => props.feedRowDeleteHandler(props.id)}
        />
      </Grid>
    </Grid>
  );
}
