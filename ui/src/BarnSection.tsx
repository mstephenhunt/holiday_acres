import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HorseInfoCard from './HorseInfoCard';

const mockResponse = {
  data: [{
      id: 1, // use the section id here
      barn: 'Old Barn',
      barnSection: 'Wood Floor',
      horses: [{
        id: 1,
        name: 'Kai',
        stall: 'Stall 1',
        picturePath: '',
        feed: [{
          type: 'PELLETS',
          amount: 2,
          unit: 'SCOOP'
        }, {
          type: 'FIBREMAX',
          amount: 0.5,
          unit: 'SCOOP'
        }],
        specialInstructions: ''
      }, {
        id: 2,
        name: 'Tiger',
        stall: 'Stall 2',
        picturePath: '',
        feed: [{
          type: 'PELLETS',
          amount: 1,
          unit: 'SCOOP'
        }, {
          type: 'FIBREMAX',
          amount: 0.5,
          unit: 'SCOOP'
        }],
        specialInstructions: ''
      }]
  }, {
      id: 1, // use the section id here
      barn: 'Old Barn',
      barnSection: 'Basement',
      horses: [{
        id: 1,
        name: 'Kai',
        stall: 'Stall 1',
        picturePath: '',
        feed: [{
          type: 'PELLETS',
          amount: 2,
          unit: 'SCOOP'
        }, {
          type: 'FIBREMAX',
          amount: 0.5,
          unit: 'SCOOP'
        }],
        specialInstructions: ''
      }, {
        id: 2,
        name: 'Tiger',
        stall: 'Stall 2',
        picturePath: '',
        feed: [{
          type: 'PELLETS',
          amount: 1,
          unit: 'SCOOP'
        }, {
          type: 'FIBREMAX',
          amount: 0.5,
          unit: 'SCOOP'
        }],
        specialInstructions: ''
      }]
  }],
  metadata: {}
}


export default function BarnSection() {
  const data = mockResponse.data;
  const error = null;

  const barnSections = data;

  return (
    <Container sx={{ py: 2 }} maxWidth="md">
      <Grid container spacing={4}>
        {barnSections.map((barnSection) => (
          <Grid item key={barnSection.id} xs={12}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/*Barn Section Title*/}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {barnSection.barnSection}
                </Typography>

                {/*Horse Cards*/}
                <Grid container spacing={4}>
                  {barnSection.horses.map((horse) => (
                    <Grid item key={horse.id} xs={12}>
                      <HorseInfoCard name={horse.name}/>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
