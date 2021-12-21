import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HorseCard from "./HorseCard";
import { Feed, FeedType, FeedUnit, BarnSectionType } from "./types";
import { fetcher } from "./fetcher";
import useSWR from "swr";
import { useState, useEffect } from "react";

export default function BarnSection() {
  const [barnSections, setBarnSections] = useState<BarnSectionType[]>();

  useEffect(() => {
    if (!barnSections) {
      getBarnSections();
    }
  });

  const getBarnSections = async () => {
    const response = await fetch(
      `api/barn_sections/`.toString(),
      {}
    );
    const barnSections = await response.json();

    if (barnSections) {
      setBarnSections(barnSections as BarnSectionType[]);
    }
  };

  if (!barnSections) {
    return <h1>No Data</h1>;
  } else {
    return (
      <Container sx={{ py: 2 }} maxWidth="md">
        {barnSections != undefined && (
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
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      style={{ fontWeight: 600 }}
                    >
                      {barnSection.name}
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
        )}
      </Container>
    );
  }
}
