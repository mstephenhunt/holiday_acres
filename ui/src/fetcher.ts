function responseTimeout(milliseconds: number) {
  return new Promise<Response>((resolve) => {
    setTimeout(() => {
      resolve(
        new Response(null, { status: 408, statusText: "UI fetch timeout" })
      );
    }, milliseconds);
  });
}

/**
 * Docs for fetch(): https://developer.mozilla.org/en-US/docs/Web/API/fetch
 */
export const fetcher = async (path: string): Promise<any> => {
  const timeout = 5000;
  const url = `http://localhost:8000${path}`;

  const response = await (await fetch(url.toString(), {})).json();

  console.log("RESPONDING ", response);

  return response;

  // Promise.race used for either timeout or request resolution
  // return Promise.race(await [(await fetch(url.toString(), {})).json(), responseTimeout(timeout)]);
};
