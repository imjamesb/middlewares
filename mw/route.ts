// Imports
import { type Handler, mw, type NextFn } from "../mw.ts";
import type { ParamParser } from "../param.type.ts";

export type ParamObject<S extends string> = { params: ParamParser<S> };
export type RoutedRequest<S extends string> = Request & ParamObject<S>;
export type RoutedHandler<S extends string> = (
  request: RoutedRequest<S>,
  init: ResponseInit,
  next: NextFn,
) => ReturnType<NextFn>;

export function route<S extends string>(
  pathname: S,
  ...middleware: RoutedHandler<S>[]
): Handler {
  const pattern = new URLPattern({ pathname });
  return (req, init, next) => {
    if (pattern.test(req.url)) {
      const match = pattern.exec(req.url);
      const clone = req.clone() as unknown as RoutedRequest<S>;
      clone.params = ((match || {}).pathname || {}).groups;
      return mw(middleware as unknown as Handler[], 0, clone, init, next)();
    }
    return next();
  };
}

export default route;
