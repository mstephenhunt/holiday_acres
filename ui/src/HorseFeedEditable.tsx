import * as React from 'react';
import { Feed, FeedType } from "./types";
import { feedTypeToLabelMap } from './feedHelpers';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type HorseFeedEditableComponentProps = {
  feed?: Feed;
}

export default function HorseFeedEditable(props: HorseFeedEditableComponentProps) {
  const [feedLabel, setFeedLabel] = React.useState<string>('');

  const handleFeedTypeChange = (event: SelectChangeEvent) => {
    setFeedLabel(event.target.value as string);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="feed-select-label">Feed</InputLabel>
        <Select
          labelId="feed-select-label"
          // id="demo-simple-select" // what is this for?
          value={feedLabel}
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
  );
}
