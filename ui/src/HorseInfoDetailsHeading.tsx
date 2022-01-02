import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

type HorseInfoDetailsHeadingProps = {
  id: number;
  edit: boolean;
  name: string;
  stall: string;
  imagePath: string;
};

export default function HorseInfoDetailsHeading(
  props: HorseInfoDetailsHeadingProps
) {
  return (
    <Grid container spacing={0}>
      <Grid item xs={3}>
        <CardMedia
          component="img"
          sx={{
            width: 80,
            height: 80,
            boxShadow: "rgba(0, 0, 0, 0.4) 0px 3px 8px",
          }}
          image="https://source.unsplash.com/random"
          alt={props.name}
        />
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
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
      <Grid item xs={3} sx={{ display: "flex" }}>
        <Grid container>
          <Grid item>
            {props.edit === false && (
              <Button
                variant="outlined"
                href={`http://localhost:3000/horse/edit/${props.id}/`}
              >
                Edit
              </Button>
            )}
            {props.edit === true && (
              <Button
                variant="contained"
                href={`http://localhost:3000/horse/${props.id}/`}
              >
                Save
              </Button>
            )}
          </Grid>
          <Grid item sx={{ alignSelf: "flex-end" }}>
            <Typography variant="subtitle1" sx={{ height: 28 }}>
              {props.stall}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
