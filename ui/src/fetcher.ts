function responseTimeout(milliseconds: number) {
  return new Promise<Response>((resolve) => {
    setTimeout(() => {
      resolve(
        new Response(null, { status: 408, statusText: "UI fetch timeout" })
      );
    }, milliseconds);
  });
}

export enum RequestType {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
}

/**
 * Docs for fetch(): https://developer.mozilla.org/en-US/docs/Web/API/fetch
 */
export const fetcher = async (
  path: string,
  method = RequestType.GET,
  body?: object
): Promise<Response> => {
  const timeout = 5000;
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}${path}`;
  // Promise.race used for either timeout or request resolution
  return Promise.race([
    fetch(url.toString(), { method, body: JSON.stringify(body) }),
    responseTimeout(timeout),
  ]);
};
