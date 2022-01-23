import * as React from 'react';
import HorseInfoDetailsHeading from "./HorseInfoDetailsHeading";
import HorseSpecialInstructions from "./HorseSpecialInstructions";
import HorseFeed from "./HorseFeed";
import HorseFeedEditable from "./HorseFeedEditable";
import { Feed } from "./types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { fetcher, RequestType } from './fetcher';

type HorseDetailsCardProps = {
  id: number;
  edit: boolean;
  name: string;
  stall: string;
  feed: Feed[];
  specialInstructions?: string;
};

export default function HorseDetailsCard(props: HorseDetailsCardProps) {
  // Since there's a list of feed that this horse has, we need a handler for each horse/field
  const feedLabelHandlers = props.feed.map(() => {
    const [feedLabel, setFeedLabel] = React.useState<string>('');
    const [feedAmount, setFeedAmount] = React.useState<number>(-1);
    const [feedUnit, setFeedUnit] = React.useState<string>('');

    return {
      feedLabel,
      setFeedLabel,
      feedAmount,
      setFeedAmount,
      feedUnit,
      setFeedUnit
    }
  });

  const specialInstructions = props.specialInstructions ? props.specialInstructions : 'None';

  return (
    <Card
      sx={{
        display: "flex",
        padding: 1,
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <Grid container direction="row">
        <Grid item xs={12}>
          <HorseInfoDetailsHeading
            id={props.id}
            edit={props.edit}
            name={props.name}
            stall={props.stall}
            imagePath="some junk"
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              width: 0.95,
              borderBottom: 0.8,
              borderColor: "#C4C4C4",
              marginTop: 0.5,
              marginBottom: 0.5,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          { !props.edit &&
          props.feed.map((feed) => (
            <HorseFeed
              id={feed.id}
              feed_type={feed.feed_type}
              amount={feed.amount}
              unit={feed.unit}
            />
          ))}
          { props.edit &&
            props.feed.map((feed, index) => (
              <HorseFeedEditable
                setFeedLabel={feedLabelHandlers[index].setFeedLabel}
                setFeedAmount={feedLabelHandlers[index].setFeedAmount}
                setFeedUnit={feedLabelHandlers[index].setFeedUnit}
                feedLabel={feedLabelHandlers[index].feedLabel}
                feedUnit={feedLabelHandlers[index].feedUnit}
                feedAmount={feedLabelHandlers[index].feedAmount}
                feedType={feed.feed_type}
              />
            ))
          }
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            sx={{
              display: "flex",
              width: 0.95,
              borderBottom: 0.8,
              borderColor: "#C4C4C4",
              marginTop: 0.5,
              marginBottom: 0.5,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <HorseSpecialInstructions
            specialInstructions={specialInstructions}
          />
        </Grid>
      </Grid>
    </Card>
  );
}
