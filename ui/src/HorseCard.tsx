import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import HorseInfoHeading from "./HorseInfoHeading";
import { Feed } from "./types";
import HorseFeed from "./HorseFeed";
import HorseSpecialInstructions from "./HorseSpecialInstructions";

type HorseCardProps = {
  id: number;
  name: string;
  stall: string;
  feed: Feed[];
  specialInstructions?: string;
  publicPhotoUrl?: string;
};

export default function HorseCard(props: HorseCardProps) {
  return (
    <Grid item xs={12}>
      <Card
        sx={{
          display: "flex",
          padding: 1,
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <CardActionArea href={`/horse/${props.id}`}>
          <Grid container direction="row">
            <Grid item xs={12}>
              <HorseInfoHeading
                name={props.name}
                stall={props.stall}
                imagePath={props.publicPhotoUrl}
              />
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
              {props.feed.map((feed) => (
                <HorseFeed
                  id={feed.id}
                  feed_type={feed.feed_type}
                  amount={feed.amount}
                  unit={feed.unit}
                />
              ))}
            </Grid>
            {props.specialInstructions && (
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
            )}
            {props.specialInstructions && (
              <Grid item xs={12}>
                <HorseSpecialInstructions
                  edit={false}
                  specialInstructions={props.specialInstructions}
                />
              </Grid>
            )}
          </Grid>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
