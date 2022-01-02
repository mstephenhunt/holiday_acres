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
export const fetcher = async (path: string): Promise<Response> => {
  const timeout = 5000;
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}${path}`;

  console.log(url)

  // Promise.race used for either timeout or request resolution
  return Promise.race([fetch(url.toString(), {}), responseTimeout(timeout)]);
};
