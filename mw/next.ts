// Imports
import type { NextFn } from "../mw.ts";

export function next(___: Request, __: ResponseInit, _: NextFn) {
  return _();
}

export default next;
