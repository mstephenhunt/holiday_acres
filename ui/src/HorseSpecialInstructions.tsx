import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function HorseSpecialInstructions(props: {
  specialInstructions: string;
}) {
  return (
    <Grid container sx={{ flexGrow: "column" }}>
      <Grid item xs={12}>
        <Typography sx={{ fontWeight: 600, color: "#606060" }}>
          Special Instructions
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="body2"
          display="block"
          gutterBottom
          sx={{ color: "#606060" }}
        >
          {props.specialInstructions}
        </Typography>
      </Grid>
    </Grid>
  );
}
