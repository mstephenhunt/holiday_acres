import useSWR from "swr";
import { fetcher } from "../fetcher";
import { useEffect } from 'react';

/**
 * Server-side rendering for a basic health check.
 */
export default function health() {
  const { data, error } = useSWR("/api/health", fetcher);

  return (
    <div>
      <p>Dummy health page</p>
    </div>
  );
}
