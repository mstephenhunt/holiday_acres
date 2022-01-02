import { Feed } from "./types";

type HorseFeedEditableComponentProps = {
  feed?: Feed;
}

export default function HorseFeedEditable(props: HorseFeedEditableComponentProps) {
  return (
    <h1>editable feed</h1>
  );
}
