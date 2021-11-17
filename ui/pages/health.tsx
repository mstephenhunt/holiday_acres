import useSWR from "swr";
import { fetcher } from "../fetcher";
import { useEffect } from "react";

type HealthResponse = {
  current_datetime: string
}

/**
 * Server-side rendering for a basic health check.
 */
export default function health() {
  const { data, error } = useSWR<HealthResponse, Error>("/api/health", fetcher);

  let message = '';

  if (error) {
    message = `Error loading health page: ${error}`;
  } else if (!data) {
    message = 'loading...';
  } else if (!error && data) {
    message = `Health check loaded, current date time: ${data.current_datetime}`
  }

  return (
    <div>
      <p>{message}</p>
    </div>
  );
}
