// Imports
import { type Handler, mw } from "../mw.ts";

export type ExpressionFn = (
  req: Request,
  init: ResponseInit,
) => boolean | Promise<boolean>;

export type AddMw = (...middleware: Handler[]) => Handler;

export function condition(
  expression: ExpressionFn,
): AddMw {
  return (...middleware) =>
    async (req, init, next) => {
      const result = await expression(req, init);
      if (result) {
        return mw(middleware, 0, req, init, next)();
      }
      return next();
    };
}
