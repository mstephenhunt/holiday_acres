import useSWR from "swr";
import { fetcher } from "../fetcher";
import { useEffect } from 'react';

/**
 * Server-side rendering for a basic health check.
 */
export default function health() {
  const { data, error } = useSWR("/api/health", fetcher);

  useEffect(() => {
    // Every second, call health endpoint
    const timer = setTimeout(() => console.log("Hello, World!"), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <p>Dummy health page</p>
    </div>
  );
}
