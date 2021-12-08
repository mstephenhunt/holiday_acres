import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

type HorseInfoHeadingProps = {
  name: string;
  stall: string
};

export default function HorseInfoHeading(props: HorseInfoHeadingProps) {
  return (
    <Grid container spacing={0} alignItems="center">
      <Grid item xs={6}>
        <Typography component="h3" variant="h5">
          {props.name}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography component="h3" variant="h5">
          {props.stall}
        </Typography>
      </Grid>
    </Grid>
  );
}
