import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import HorseInfoHeading from './HorseInfoHeading';

type HorseInfoCardProps = {
  id: number;
  name: string;
  stall: string;
}

export default function HorseInfoCard(props: HorseInfoCardProps) {
  return (
    <Grid item key={props.id} xs={12}>
      <Card sx={{ display: 'flex' }}>
        <CardMedia
          component="img"
          sx={{ width: 80, height: 80, display: { xs: 'block' } }}
          image='https://source.unsplash.com/random'
          alt={props.name}
        />
        <CardContent sx={{ flex: 1 }}>
          {/*Title Grid*/}
           <HorseInfoHeading
             name={props.name}
             stall={props.stall}
           />
        </CardContent>
      </Card>
    </Grid>
  );
}
