import HorseInfoDetailsHeading from "./HorseInfoDetailsHeading";
import HorseSpecialInstructions from "./HorseSpecialInstructions";
import HorseFeed from "./HorseFeed";
import HorseFeedEditable from "./HorseFeedEditable";
import { Feed, FeedUnit, FeedType } from "./types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useRouter } from 'next/router';
import { fetcher, RequestType } from './fetcher';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";

type HorseDetailsCardProps = {
  id: number;
  edit: boolean;
  name: string;
  stall: string;
  feed: Feed[];
  specialInstructions?: string;
};

type FeedDetails = {
  id: number;
  feedType: FeedType;
  feedAmount: number;
  feedUnit: FeedUnit;
}

export default function HorseDetailsCard(props: HorseDetailsCardProps) {
  const router = useRouter();

  // let feedStates: FeedDetails[] = [];
  const [feedHandlers, setFeedHandlers] = useState<FeedDetails[]>();

  const initializeFeedHandlers = () => {
    setFeedHandlers(props.feed.map((feed) => {
      return {
        id: feed.id,
        feedType: feed.feed_type,
        feedAmount: feed.amount ? feed.amount : 0,
        feedUnit: feed.unit
      }
    }));
  };

  useEffect(() => {
    if (feedHandlers === undefined) {
      initializeFeedHandlers();
    }
  });

  /**
   * Whenever any value is updated for a feed row, this function is executed.
   */
  const updateFeedState = (input: {
    id: number,
    feedType: FeedType,
    feedAmount: number,
    feedUnit: FeedUnit
  }) => {
    if (feedHandlers === undefined) {
      throw new Error('Unable to update row, feed handlers not initialized');
    }

    const index = feedHandlers.findIndex((feedState) => {
      return feedState.id === input.id;
    });

    if (index === -1) {
      throw new Error('Unable to update row, cannot find id');
    }

    feedHandlers[index].feedType = input.feedType;
    feedHandlers[index].feedAmount = input.feedAmount;
    feedHandlers[index].feedUnit = input.feedUnit;

    const newFeedHandlers = [...feedHandlers];
    newFeedHandlers[index].feedType = input.feedType;
    newFeedHandlers[index].feedAmount = input.feedAmount;
    newFeedHandlers[index].feedUnit = input.feedUnit;

    setFeedHandlers(newFeedHandlers);
  };

  /**
   * Used whenever you click the 'x' button, removes the entry from the state array
   */
  const removeFeedRow = (id: number) => {
    if (feedHandlers === undefined) {
      throw new Error('Unable to remove row, feed handlers not initialized');
    }

    const index = feedHandlers.findIndex((feedState) => {
      return feedState.id === id;
    });

    if (index === -1) {
      throw new Error('Unable to update row, cannot find id');
    }

    const newFeedHandlers = [...feedHandlers];
    newFeedHandlers.splice(index, 1);

    setFeedHandlers(newFeedHandlers);
  };

  /**
   * Used whenever you click the 'add feed' button, adds a new row to the table
   */
  const addFeedRow = () => {
    if (feedHandlers === undefined) {
      throw new Error('Unable to add row, feed handlers not initialized');
    }

    const newRow: FeedDetails = {
      id: feedHandlers.length + 1,
      feedType: FeedType.PELLETS,
      feedAmount: 0,
      feedUnit: FeedUnit.SCOOP,
    };

    const newFeedHandlers = [...feedHandlers, newRow];

    setFeedHandlers(newFeedHandlers);
  };

  const specialInstructions = props.specialInstructions
    ? props.specialInstructions
    : "None";

  const updateHorse = async () => {
    if (feedHandlers === undefined) {
      throw new Error('Unable to update, missing edit feed handlers');
    }

    // @TODO: Right now this is only set up to update feed, the ui needs to be set
    // up to edit other fields.
    const body = {
      feed: feedHandlers.map((feedLabelHandler) => {
        return {
          amount: feedLabelHandler.feedAmount,
          feed_type: feedLabelHandler.feedType,
          unit: feedLabelHandler.feedUnit
        }
      })
    }

    await fetcher({
      path: `/api/horses/${props.id}/`,
      method: RequestType.PATCH,
      body,
      requestHeaders: [{
        headerKey: 'content-type',
        headerValue: 'application/json'
      }]
    })

    await router.push(`/horse/${props.id}/`)
  };

  if (feedHandlers === undefined) {
    return <h1>Loading...</h1>
  }

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
            updateHorse={updateHorse}
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
          {!props.edit &&
            props.feed.map((feed) => (
              <HorseFeed
                key={feed.id}
                id={feed.id}
                feed_type={feed.feed_type}
                amount={feed.amount}
                unit={feed.unit}
              />
            ))}
          {props.edit &&
            feedHandlers.map((feedState) => (
              <HorseFeedEditable
                key={feedState.id}
                id={feedState.id}
                feedType={feedState.feedType}
                feedUnit={feedState.feedUnit}
                feedAmount={feedState.feedAmount}
                feedRowUpdateHandler={updateFeedState}
                feedRowDeleteHandler={removeFeedRow}
              />
            ))}
        </Grid>
        {props.edit && <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "right", paddingTop: '10px' }}
        >
          <Button variant="outlined" onClick={() => addFeedRow()}>
            Add Feed
          </Button>
        </Grid>}
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "center", paddingTop: "5px" }}
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
            edit={props.edit}
            specialInstructions={specialInstructions}
          />
        </Grid>
      </Grid>
    </Card>
  );

}
