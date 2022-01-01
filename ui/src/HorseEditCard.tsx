import HorseInfoEditHeading from './HorseInfoEditHeading';
import HorseFeed from './HorseFeed';
import { Feed } from "./types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

type HorseEditCardProps = {
  id: number;
  name: string;
  stall: string;
  feed: Feed[];
  specialInstructions?: string;
};

export default function HorseEditCard(props: HorseEditCardProps) {
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
          <HorseInfoEditHeading
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
          {props.feed.map((feed) => (
            <HorseFeed
              id={feed.id}
              feed_type={feed.feed_type}
              amount={feed.amount}
              unit={feed.unit}
            />
          ))}
        </Grid>
      </Grid>
    </Card>
  );
}