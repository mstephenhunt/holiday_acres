import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HorseCard from './HorseCard';
import { Feed, FeedType, FeedUnit } from './types';

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
          type: FeedType.PELLETS,
          amount: 2,
          unit: FeedUnit.SCOOP
        }, {
          type: FeedType.FIBREMAX,
          amount: 0.5,
          unit: FeedUnit.SCOOP
        }, {
          type: FeedType.HAY_CUT,
          amount: undefined,
          unit: FeedUnit.FIRST_CUT
        }] as Feed[],
        specialInstructions: 'These are some sample instructions'
      }, {
        id: 2,
        name: 'Tiger',
        stall: 'Stall 2',
        picturePath: '',
        feed: [{
          type: FeedType.PELLETS,
          amount: 1,
          unit: FeedUnit.SCOOP
        }, {
          type: FeedType.FIBREMAX,
          amount: 0.5,
          unit: FeedUnit.SCOOP
        }, {
          type: FeedType.HAY_CUT,
          amount: undefined,
          unit: FeedUnit.FIRST_CUT
        }] as Feed[],
        specialInstructions: undefined
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
          type: FeedType.PELLETS,
          amount: 2,
          unit: FeedUnit.SCOOP
        }, {
          type: FeedType.FIBREMAX,
          amount: 0.5,
          unit: FeedUnit.SCOOP
        }, {
          type: FeedType.HAY_CUT,
          amount: undefined,
          unit: FeedUnit.FIRST_CUT
        }] as Feed[],
        specialInstructions: undefined
      }, {
        id: 2,
        name: 'Tiger',
        stall: 'Stall 2',
        picturePath: '',
        feed: [{
          type: FeedType.PELLETS,
          amount: 1,
          unit: FeedUnit.SCOOP
        }, {
          type: FeedType.FIBREMAX,
          amount: 0.5,
          unit: FeedUnit.SCOOP
        }, {
          type: FeedType.HAY_CUT,
          amount: undefined,
          unit: FeedUnit.FIRST_CUT
        }] as Feed[],
        specialInstructions: 'These are some sample instructions'
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
                <Typography gutterBottom variant="h5" component="h2" style={{ fontWeight: 600 }}>
                  {barnSection.barnSection}
                </Typography>
                {/*Horse Cards*/}
                <Grid container spacing={3}>
                {barnSection.horses.map((horse) => (
                  <HorseCard
                    name={horse.name}
                    id={horse.id}
                    stall={horse.stall}
                    feed={horse.feed}
                    specialInstructions={horse.specialInstructions}
                  />
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
