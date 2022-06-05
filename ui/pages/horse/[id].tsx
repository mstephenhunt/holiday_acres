import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import ButtonAppBar from "../../src/ButtonAppBar";
import HorseDetailsCard from "../../src/HorseDetailsCard";
import { Horse } from "../../src/types";
import { fetcher } from "../../src/fetcher";
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

    const response = await fetcher({ path: `/api/horses/${id}/` });
    const horse = await response.json();

    if (horse && horse.detail !== "Not found.") {
      setHorse(horse as Horse);
    }
  };

  useEffect(() => {
    if (!horse) {
      getHorse();
    }
  });

  if (!horse) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <Container disableGutters>
        <ButtonAppBar />
        <Container sx={{ py: 2 }} maxWidth="xs" disableGutters>
          <HorseDetailsCard
            id={horse.id}
            edit={false}
            name={horse.name}
            stall={horse.stall}
            feed={horse.feed}
            specialInstructions={horse.special_instructions}
          />
        </Container>
      </Container>
    );
  }
}
