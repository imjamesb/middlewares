// Imports
import type { Handler } from "../mw.ts";

export interface CORSOptions {
  /** If left empty then any host is allowed. */
  allowedOrigins?: string[];
}

export function cors(options?: CORSOptions): Handler {
  options ??= {};
  options.allowedOrigins ??= [];
  const allowAny = options.allowedOrigins.length < 1;
  const allowedOrigins: Record<string, boolean> = {};
  for (const origin of options.allowedOrigins) allowedOrigins[origin] = true;
  return async (req, _, next) => {
    const response = await next();
    if (allowAny) {
      response.headers.set("Access-Control-Allow-Origin", "*");
      return response;
    }
    const origin = new URL(req.url).origin;
    if (allowedOrigins[origin]) {
      response.headers.set("Access-Control-Allow-Origin", origin);
    }
    return response;
  };
}
