// Imports
import { type AddMw, condition } from "./condition.ts";

export function method(
  name: string,
): AddMw {
  const cond = condition((req) => req.method === name);
  return (...middleware) => cond(...middleware);
}
