import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import BedroomBabyIcon from '@mui/icons-material/BedroomBaby';

type HorseInfoHeadingProps = {
  name: string;
  stall: string;
  imagePath?: string;
};

export default function HorseInfoHeading(props: HorseInfoHeadingProps) {
  return (
    <Grid container spacing={0}>
      <Grid item xs={3}>
        {
          !!props.imagePath ?
        <CardMedia
            component="img"
            sx={{
              width: 80,
              height: 80,
              boxShadow: "rgba(0, 0, 0, 0.4) 0px 3px 8px",
            }}
            image={props.imagePath}
            alt={props.name}
          />
          :
        <BedroomBabyIcon
          sx={{
            width: 80,
            height: 80,
            boxShadow: "rgba(0, 0, 0, 0.4) 0px 3px 8px",
          }}
        />
        }
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
          marginBottom: 2,
          paddingLeft: 2,
          alignSelf: "flex-end",
        }}
      >
        <Typography
          component="h4"
          variant="h4"
          sx={{ fontWeight: 600, height: 40 }}
        >
          {props.name}
        </Typography>
      </Grid>
      <Grid item xs={3} sx={{ display: "flex", marginBottom: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{ height: 28, alignSelf: "flex-end" }}
        >
          {props.stall}
        </Typography>
      </Grid>
    </Grid>
  );
}
