import HorseInfoDetailsHeading from "./HorseInfoDetailsHeading";
import HorseSpecialInstructions from "./HorseSpecialInstructions";
import HorseFeed from "./HorseFeed";
import HorseFeedEditable from "./HorseFeedEditable";
import { Feed } from "./types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

type HorseDetailsCardProps = {
  id: number;
  edit: boolean;
  name: string;
  stall: string;
  feed: Feed[];
  specialInstructions?: string;
};

export default function HorseDetailsCard(props: HorseDetailsCardProps) {
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
            props.feed.map((feed) => (
              <HorseFeedEditable
                feed={feed}
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
