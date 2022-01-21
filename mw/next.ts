// Imports
import type { Handler } from "../mw.ts";

export function next(): Handler {
  return (___, __, _) => _();
}

export default next;
