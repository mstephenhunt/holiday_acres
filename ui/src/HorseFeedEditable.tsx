import * as React from 'react';
import { FeedType, FeedUnit } from "./types";
import { feedTypeToLabelMap, feedUnitToLabelMap } from './feedHelpers';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

type HorseFeedEditableComponentProps = {
  setFeedLabel: React.Dispatch<React.SetStateAction<string>>,
  setFeedAmount: React.Dispatch<React.SetStateAction<number>>,
  setFeedUnit: React.Dispatch<React.SetStateAction<string>>,
  feedLabel: string;
  feedAmount: number;
  feedUnit: string;
  feedType?: FeedType;
}

export default function HorseFeedEditable(props: HorseFeedEditableComponentProps) {
  const handleFeedTypeChange = (event: SelectChangeEvent) => {
    props.setFeedLabel(event.target.value as string);
  };

  const handleFeedUnitChange = (event: SelectChangeEvent) => {
    props.setFeedUnit(event.target.value as string);
  };

  return (
    <Grid container xs={12}>
      <Grid item xs={5}>
        <Box>
          <FormControl fullWidth>
            <InputLabel>Feed</InputLabel>
            <Select
              labelId="feed-select-label"
              // id="demo-simple-select" // what is this for?
              value={props.feedLabel}
              label="Feed Type"
              onChange={handleFeedTypeChange}
            >
              <MenuItem value={FeedType.PELLETS}>{feedTypeToLabelMap.get(FeedType.PELLETS)}</MenuItem>
              <MenuItem value={FeedType.HAY_PELLETS}>{feedTypeToLabelMap.get(FeedType.HAY_PELLETS)}</MenuItem>
              <MenuItem value={FeedType.HAY_CUT}>{feedTypeToLabelMap.get(FeedType.HAY_CUT)}</MenuItem>
              <MenuItem value={FeedType.FIBREMAX}>{feedTypeToLabelMap.get(FeedType.FIBREMAX)}</MenuItem>
              <MenuItem value={FeedType.ALFALFA}>{feedTypeToLabelMap.get(FeedType.ALFALFA)}</MenuItem>
              <MenuItem value={FeedType.CARB_SAFE}>{feedTypeToLabelMap.get(FeedType.CARB_SAFE)}</MenuItem>
              <MenuItem value={FeedType.OIL}>{feedTypeToLabelMap.get(FeedType.OIL)}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <TextField
          id="outlined-number"
          label="Amt"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={5}>
        <Box>
          <FormControl fullWidth>
            <InputLabel>Unit</InputLabel>
            <Select
              labelId="feed-select-label"
              // id="demo-simple-select" // what is this for?
              value={props.feedUnit}
              label="Unit"
              onChange={handleFeedUnitChange}
            >
              <MenuItem value={FeedUnit.SCOOP}>{feedUnitToLabelMap.get(FeedUnit.SCOOP)}</MenuItem>
              <MenuItem value={FeedUnit.HANDFUL}>{feedUnitToLabelMap.get(FeedUnit.HANDFUL)}</MenuItem>
              <MenuItem value={FeedUnit.FIRST_CUT}>{feedUnitToLabelMap.get(FeedUnit.FIRST_CUT)}</MenuItem>
              <MenuItem value={FeedUnit.SECOND_CUT}>{feedUnitToLabelMap.get(FeedUnit.SECOND_CUT)}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
}
