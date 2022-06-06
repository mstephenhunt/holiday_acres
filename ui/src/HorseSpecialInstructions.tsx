import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function HorseSpecialInstructions(props: {
  edit: boolean;
  specialInstructions?: string;
  updateHandler?: Function;
}) {
  const handleSpecialInstructionsChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!props.updateHandler) {
      throw new Error('Unable to update special instructions, no handler provided');
    }
    props.updateHandler(event.target.value)
  }

  return (
    <Grid container sx={{ flexGrow: "column" }}>
      <Grid item xs={12}>
        <Typography sx={{ fontWeight: 600, color: "#606060" }}>
          Special Instructions
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {
          !props.edit &&
          <Typography
            variant="body2"
            display="block"
            gutterBottom
            sx={{ color: "#606060" }}
          >
          { !!props.specialInstructions  ? props.specialInstructions : 'None' }
        </Typography>}
        {
          props.edit &&
          <TextField
            defaultValue={props.specialInstructions}
            fullWidth
            multiline
            onChange={handleSpecialInstructionsChanged}
          />}
      </Grid>
    </Grid>
  );
}
