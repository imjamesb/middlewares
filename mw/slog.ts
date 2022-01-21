// Imports
import type { Handler } from "../mw.ts";
import { sprintf } from "https://deno.land/std@0.122.0/fmt/printf.ts";
import { nms, now } from "../util.ts";

export interface FormattingData {
  req: Request;
  res?: Response;
  error?: Error;
  start: number;
  end: number;
}

export interface Formatter {
  (
    data: FormattingData,
  ): string | Promise<string>;
}

async function log(formatter: Formatter, data: FormattingData) {
  console.log(await formatter(data));
}

export function slog(formatter: Formatter): Handler {
  return async (req, _, next) => {
    const start = now();
    try {
      const res = await next();
      await log(formatter, { req, res, start, end: now() });
      return res;
    } catch (error) {
      await log(formatter, { req, error, start, end: now() });
      throw error;
    }
  };
}

// (method) (url) [ms] - (status) (status text)
// (method) (url) [ms] - (error message)

export function simpleLogger(
  { res, error, req, end, start }: FormattingData,
): string {
  const time = nms(end, start);
  return error
    ? sprintf(
      "%s %s%s%s",
      req.method,
      req.url,
      time.length > 0 ? ` ${time} ` : "",
      error.message,
    )
    : sprintf(
      "%s %s%s%d %s",
      req.method,
      req.url,
      time.length > 0 ? ` ${time} ` : "",
      res?.status,
      res?.statusText,
    );
}
