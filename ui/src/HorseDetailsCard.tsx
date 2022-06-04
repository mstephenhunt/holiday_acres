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
  feedLabel: FeedType;
  setFeedLabel: Function;
  feedAmount: number;
  setFeedAmount: Function;
  feedUnit: FeedUnit;
  setFeedUnit: Function;
  deleted: boolean;
}

export default function HorseDetailsCard(props: HorseDetailsCardProps) {
  const router = useRouter();
  const [editFeedHandlers, setEditFeedHandlers] = useState<FeedDetails[]>();
  const feedLabelsHooks = props.feed.map(feed => { return useState<FeedType>(feed.feed_type) });
  const feedAmountHooks = props.feed.map(feed => { return useState<number>(feed.amount ? feed.amount : 0) });
  const feedUnitHooks = props.feed.map(feed => { return useState<FeedUnit>(feed.unit) });

  const getEditFeedLabelHandlers = () => {
    // Since there's a list of feed that this horse has, we need a handler for each horse/field
    setEditFeedHandlers(props.feed.map((feed, index) => {
      // These fields should be initialized to whatever is currently on the horse
      // const [feedLabel, setFeedLabel] = useState<FeedType>(feed.feed_type);
      // const [feedAmount, setFeedAmount] = useState<number | undefined>(
      //   feed.amount
      // );
      const [feedLabel, setFeedLabel] = feedLabelsHooks[index];
      const [feedAmount, setFeedAmount] = feedAmountHooks[index];
      const [feedUnit, setFeedUnit] = feedUnitHooks[index];

      return {
        id: feed.id,
        feedLabel,
        setFeedLabel,
        feedAmount: feedAmount ? feedAmount : 0,
        setFeedAmount,
        feedUnit,
        setFeedUnit,
        deleted: false
      };
    }));
  }

  useEffect(() => {
    if (!editFeedHandlers) {
      getEditFeedLabelHandlers();
    }
  })

  /**
   * Deletes whatever row in the feedLabelHandlers array has the passed feed id
   */
  const feedRowDeleteHandler = (feedId: number) => {
    if (!editFeedHandlers) {
      throw new Error('Unable to update, missing edit feed handlers');
    }

    const index = editFeedHandlers.findIndex(feedLabelHandler => {
      return feedId === feedLabelHandler.id;
    });

    if (index === -1) {
      throw new Error('Unable to find edit feed handler')
    }

    const updatedHandlers = [...editFeedHandlers];
    updatedHandlers[index].deleted = true;

    setEditFeedHandlers(updatedHandlers);
  }

  const specialInstructions = props.specialInstructions
    ? props.specialInstructions
    : "None";

  const updateHorse = async () => {
    if (!editFeedHandlers) {
      throw new Error('Unable to update, missing edit feed handlers');
    }

    // @TODO: Right now this is only set up to update feed, the ui needs to be set
    // up to edit other fields.
    const body = {
      feed: editFeedHandlers.map((feedLabelHandler) => {
        return {
          amount: feedLabelHandler.feedAmount,
          feed_type: feedLabelHandler.feedLabel,
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

  if (!editFeedHandlers) {
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
            props.feed.map((feed, index) => (
              editFeedHandlers[index].deleted === false && <HorseFeedEditable
                key={feed.id}
                id={feed.id}
                setFeedLabel={editFeedHandlers[index].setFeedLabel}
                setFeedAmount={editFeedHandlers[index].setFeedAmount}
                setFeedUnit={editFeedHandlers[index].setFeedUnit}
                feedLabel={editFeedHandlers[index].feedLabel}
                feedUnit={editFeedHandlers[index].feedUnit}
                feedAmount={editFeedHandlers[index].feedAmount}
                feedType={feed.feed_type}
                feedRowDeleteHandler={feedRowDeleteHandler}
              />
            ))}
        </Grid>
        {props.edit && <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "right", paddingTop: '10px' }}
        >
          <Button variant="outlined">
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
