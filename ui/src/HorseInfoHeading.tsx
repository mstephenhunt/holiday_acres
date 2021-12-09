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
        <Typography component="h4" variant="h4" sx={{ fontWeight: 600 }}>
          {props.name}
        </Typography>
      </Grid>
      <Grid item xs={6} sx={{ marginTop: 'auto' }}>
        <Typography variant="subtitle1">
          {props.stall}
        </Typography>
      </Grid>
    </Grid>
  );
}
