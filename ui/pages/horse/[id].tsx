import { useRouter } from 'next/router';
import Container from "@mui/material/Container";
import ButtonAppBar from "../../src/ButtonAppBar";
import HorseCard from "../../src/HorseCard";
import { Horse } from '../../src/types';
import { useState, useEffect } from "react";

export default function HorseDetails() {
  const [horse, setHorse] = useState<Horse>();
  const { query } = useRouter();
  const id = query.id;

  const getHorse = async () => {
    /**
     * For some reason this page is loading against /horse/undefined a bunch
     * before getting access to the id from the url ¯\_(ツ)_/¯
     */
    if (!id) {
      return;
    }

    const response = await fetch(
      `http://localhost:8000/api/horses/${id}/`.toString(),
      {}
    );
    const horse = await response.json();

    if (horse && horse.detail !== 'Not found.') {
      setHorse(horse as Horse);
    }
  };

  useEffect(() => {
    if (!horse) {
      getHorse();
    }
  });

  if (!horse) {
    return <h1>Loading...</h1>
  } else {
    return (
      <Container disableGutters>
        <ButtonAppBar />
        <Container sx={{ py: 2 }} maxWidth="md">
          <HorseCard
            name={horse.name}
            id={horse.id}
            stall={horse.stall}
            feed={horse.feed}
            specialInstructions={horse.special_instructions}
          />
        </Container>
      </Container>)
  }
}
