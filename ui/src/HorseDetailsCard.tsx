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
  publicPhotoUrl?: string;
  specialInstructions?: string;
};

type HorseDetails = {
  name: string;
  stall: string;
  feedDetails: FeedDetails[];
  specialInstructions?: string;
}

type FeedDetails = {
  id: number;
  feedType: FeedType;
  feedAmount: number;
  feedUnit: FeedUnit;
}

export default function HorseDetailsCard(props: HorseDetailsCardProps) {
  const router = useRouter();

  const [horseDetailsHandler, setHorseDetailsHandler] = useState<HorseDetails>();

  const initializeHorseDetailsHandler = () => {
    setHorseDetailsHandler({
      name: props.name,
      stall: props.stall,
      feedDetails: props.feed.map((feed) => {
      return {
          id: feed.id,
          feedType: feed.feed_type,
          feedAmount: feed.amount ? feed.amount : 0,
          feedUnit: feed.unit
        }
      }),
      specialInstructions: props.specialInstructions
    });
  }

  useEffect(() => {
    if (!horseDetailsHandler) {
      initializeHorseDetailsHandler();
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
    if (horseDetailsHandler === undefined) {
      throw new Error('Unable to update row, feed handlers not initialized');
    }

    const index = horseDetailsHandler.feedDetails.findIndex((feedState) => {
      return feedState.id === input.id;
    });

    if (index === -1) {
      throw new Error('Unable to update row, cannot find id');
    }

    horseDetailsHandler.feedDetails[index].feedType = input.feedType;
    horseDetailsHandler.feedDetails[index].feedAmount = input.feedAmount;
    horseDetailsHandler.feedDetails[index].feedUnit = input.feedUnit;

    const newHorseDetailsHandler = { ...horseDetailsHandler }
    newHorseDetailsHandler.feedDetails[index].feedType = input.feedType;
    newHorseDetailsHandler.feedDetails[index].feedAmount = input.feedAmount;
    newHorseDetailsHandler.feedDetails[index].feedUnit = input.feedUnit;

    setHorseDetailsHandler(newHorseDetailsHandler);
  };

  /**
   * Used whenever you click the 'x' button, removes the entry from the state array
   */
  const removeFeedRow = (id: number) => {
    if (!horseDetailsHandler) {
      throw new Error('Unable to remove row, horse handler not initialized');
    }

    const index = horseDetailsHandler.feedDetails.findIndex((feedState) => {
      return feedState.id === id;
    });

    if (index === -1) {
      throw new Error('Unable to update row, cannot find id');
    }

    const newHorseDetailsHandler = { ...horseDetailsHandler };
    newHorseDetailsHandler.feedDetails.splice(index, 1);

    setHorseDetailsHandler(newHorseDetailsHandler);
  };

  /**
   * Used whenever you click the 'add feed' button, adds a new row to the table
   */
  const addFeedRow = () => {
    if (!horseDetailsHandler) {
      throw new Error('Unable to add row, horse details handler not initialized');
    }

    const newRow: FeedDetails = {
      id: horseDetailsHandler.feedDetails.length + 1,
      feedType: FeedType.PELLETS,
      feedAmount: 0,
      feedUnit: FeedUnit.SCOOP,
    };

    const newHorseDetailsHandler = { ...horseDetailsHandler };
    newHorseDetailsHandler.feedDetails.push(newRow);

    setHorseDetailsHandler(newHorseDetailsHandler);
  };

  const updateSpecialInstructions = (specialInstructions: string) => {
    if (!horseDetailsHandler) {
      throw new Error('Unable to update, horse details handler not initialized');
    }

    const newHorseDetailsHandler = { ...horseDetailsHandler };
    newHorseDetailsHandler.specialInstructions = specialInstructions;

    setHorseDetailsHandler(newHorseDetailsHandler);
  }

  const updateHorse = async () => {
    if (!horseDetailsHandler) {
      throw new Error('Unable to update, horse details handler not initialized');
    }

    const body = {
      special_instructions: !!horseDetailsHandler.specialInstructions ? horseDetailsHandler.specialInstructions : null,
      feed: horseDetailsHandler.feedDetails.map((feedLabelHandler) => {
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

  if (!horseDetailsHandler) {
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
            imagePath={props.publicPhotoUrl}
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
            horseDetailsHandler.feedDetails.map((feedState) => (
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
            specialInstructions={horseDetailsHandler.specialInstructions}
            updateHandler={updateSpecialInstructions}
          />
        </Grid>
      </Grid>
    </Card>
  );
}
