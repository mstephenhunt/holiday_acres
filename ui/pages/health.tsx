import useSWR from "swr";
import { fetcher } from "../fetcher";

/**
 * Server-side rendering for a basic health check.
 */
export default function health() {
  const { data, error } = useSWR("/api/user", fetcher);

  return (
    <div>
      <p>Dummy health page</p>
    </div>
  );
}
