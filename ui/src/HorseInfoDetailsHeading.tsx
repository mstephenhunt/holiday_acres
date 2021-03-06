import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import BedroomBabyIcon from '@mui/icons-material/BedroomBaby';

type HorseInfoDetailsHeadingProps = {
  id: number;
  edit: boolean;
  name: string;
  stall: string;
  imagePath?: string;
  updateHorse?: Function;
};

export default function HorseInfoDetailsHeading(
  props: HorseInfoDetailsHeadingProps
) {
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
        <Grid container sx={{ justifyContent: 'end' }}>
          <Grid item>
            {props.edit === false && (
              <Button variant="outlined" href={`/horse/edit/${props.id}/`}>
                Edit
              </Button>
            )}
            {props.edit === true && props.updateHorse !== undefined && (
              // @ts-ignore
              <Button variant="contained" onClick={() => { props.updateHorse(); }}>
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
