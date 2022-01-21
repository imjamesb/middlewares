// Imports
import type { Handler } from "../mw.ts";

export function all(...init: ConstructorParameters<typeof Response>): Handler {
  const response = new Response(...init);
  return () => response.clone();
}

export default all;
