import * as React from "react";
import Album from "../src/Album";
import Container from "@mui/material/Container";
import ButtonAppBar from "../src/ButtonAppBar";
import BarnSection from "../src/BarnSection";

export default function Index() {
  return (
    <Container disableGutters maxWidth="false">
      <ButtonAppBar />
      <BarnSection />
    </Container>
  );
}
