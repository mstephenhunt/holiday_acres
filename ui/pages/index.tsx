import * as React from "react";
import Album from "../src/Album";
import Container from "@mui/material/Container";
import ButtonAppBar from "../src/ButtonAppBar";
import HorseList from "../src/HorseList";

export default function Index() {
  return (
    <Container disableGutters maxWidth="false">
      <ButtonAppBar />
      <HorseList />
    </Container>
  );
}
