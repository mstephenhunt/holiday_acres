function responseTimeout(milliseconds: number) {
  return new Promise<Response>((resolve) => {
    setTimeout(() => {
      resolve(
        new Response(null, { status: 408, statusText: "UI fetch timeout" })
      );
    }, milliseconds);
  });
}

export const fetcher = async (path: string): Promise<Response> => {
  const timeout = 5000;
  const url = `http://localhost:8000${path}`;

  // Promise.race used for either timeout or request resolution
  return Promise.race([fetch(url.toString(), {}), responseTimeout(timeout)]);
};
