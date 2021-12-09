import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import HorseInfoHeading from './HorseInfoHeading';
import { Feed } from './types';
import HorseFeed from './HorseFeed';
import HorseSpecialInstructions from './HorseSpecialInstructions';

type HorseCardProps = {
  id: number;
  name: string;
  stall: string;
  feed: Feed[];
}

export default function HorseCard(props: HorseCardProps) {
  return (
    <Grid item xs={12}>
      <Card sx={{ display: 'flex', padding: 1, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
        <Grid container xs={12}>
          <Grid item xs={12}>
            <Grid container xs={12} direction="row">
              <Grid item xs={3}>
                {/*Horse Picture*/}
                <CardMedia
                  component="img"
                  sx={{ width: 80, height: 80, display: { xs: 'block' } }}
                  image='https://source.unsplash.com/random'
                  alt={props.name}
                />
              </Grid>
              <Grid item xs={9}>
                <CardContent>
                   <HorseInfoHeading
                     name={props.name}
                     stall={props.stall}
                   />
                </CardContent>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', width: 0.95, borderBottom: 0.8, borderColor: '#C4C4C4', marginTop: 0.5, marginBottom: 0.5 }} />
          </Grid>
          <Grid item xs={12}>
            {props.feed.map((feed) => (
              <HorseFeed
                type={feed.type}
                amount={feed.amount}
                unit={feed.unit}
              />
            ))}
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', width: 0.95, borderBottom: 0.8, borderColor: '#C4C4C4', marginTop: 0.5, marginBottom: 0.5 }} />
          </Grid>
          <Grid item xs={12}>
            <HorseSpecialInstructions
              specialInstuctions='These are instructions'
            />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
