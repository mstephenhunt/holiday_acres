import HorseInfoDetailsHeading from './HorseInfoDetailsHeading';
import { Feed } from "./types";

type HorseDetailsCardProps = {
  id: number;
  name: string;
  stall: string;
  feed: Feed[];
  specialInstructions?: string;
};

export default function HorseDetailsCard(props: HorseDetailsCardProps) {
  return (
    <HorseInfoDetailsHeading
      name={props.name}
      stall={props.stall}
      imagePath="some junk"
    />
  );
}
