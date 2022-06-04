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
export const fetcher = async (input: {
  path: string,
  method?: RequestType,
  body?: object,
  requestHeaders?: {
    headerKey: string,
    headerValue: string,
  }[],
}): Promise<Response> => {
  const timeout = 5000;
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}${input.path}`;

  const requestMethod = input.method ? input.method : RequestType.GET;

  const headers = new Headers();
  if (input.requestHeaders) {
    for (const requestHeader of input.requestHeaders) {
      headers.append(requestHeader.headerKey, requestHeader.headerValue);
    }
  }

  // Promise.race used for either timeout or request resolution
  return Promise.race([
    fetch(url.toString(), {
      method: requestMethod,
      body: JSON.stringify(input.body),
      headers
    }),
    responseTimeout(timeout),
  ]);
};
