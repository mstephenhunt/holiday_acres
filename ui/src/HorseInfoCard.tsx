
type HorseInfoCardProps = {
  name: string;
}

export default function HorseInfoCard(props: HorseInfoCardProps) {
  return (
    <div>{props.name}</div>
  );
}
