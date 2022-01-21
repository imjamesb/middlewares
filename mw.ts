export type NextFn = () => Promise<Response> | Response;
export type Handler = (
  request: Request,
  init: ResponseInit,
  next: NextFn,
) => ReturnType<NextFn>;

export function mw(
  m: Handler[],
  index: number,
  request: Request,
  init: ResponseInit,
  next?: NextFn,
): () => Promise<Response> | Response {
  const M = m[index];
  if (!M && next) return next;
  if (!M) return () => new Response("", init);
  return () => M(request, init, mw(m, index + 1, request, init));
}

export function middleware(...handlers: Handler[]) {
  return (request: Request) => {
    const init: ResponseInit = {
      status: 200,
      statusText: "OK",
      headers: new Headers(),
    };
    try {
      return mw(handlers, 0, request, init)();
    } catch (error) {
      console.error(error);
      return new Response("something bad happened!", {
        statusText: "internal server error",
        status: 500,
      });
    }
  };
}
