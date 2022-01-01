import { useRouter } from 'next/router';
import Container from "@mui/material/Container";
import ButtonAppBar from "../../src/ButtonAppBar";
import { Horse } from '../../src/types';
import { useState, useEffect } from "react";

export default function HorseDetails() {
  const [horse, setHorse] = useState<Horse>();
  const { query } = useRouter();
  const id = query.id;

  const getHorse = async () => {
    const response = await fetch(
      `http://localhost:8000/api/horses/${id}/`.toString(),
      {}
    );
    const horse = await response.json();

    if (horse) {
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
      <h1>Horse Details!</h1>
      <p>{horse.name}</p>
    </Container>)
  }
}
