import HorseInfoDetailsHeading from './HorseInfoDetailsHeading';
import { Feed } from "./types";
import Card from "@mui/material/Card";

type HorseDetailsCardProps = {
  id: number;
  name: string;
  stall: string;
  feed: Feed[];
  specialInstructions?: string;
};

export default function HorseDetailsCard(props: HorseDetailsCardProps) {
  return (
    <Card
      sx={{
        display: "flex",
        padding: 1,
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <HorseInfoDetailsHeading
        name={props.name}
        stall={props.stall}
        imagePath="some junk"
      />
    </Card>
  );
}
