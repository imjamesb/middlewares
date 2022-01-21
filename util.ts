// deno-lint-ignore-file no-unused-vars
// days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds

export function now() {
  return performance.now() * 1_000_000;
}

function unit(n: number) {
  const divided = n / 1000;
  const floored = Math.floor(divided);
  const unit = Math.floor((divided - floored) * 1000);
  return [floored, unit];
}

function ustr(n: number, d: string) {
  if (n > 0) return n + d;
  return "";
}

/**
 * @param end nanoseconds
 * @param start nanoseconds
 */
export function nms(end: number, start: number) {
  let time = end - start;
  let nanosecond!: number,
    microsecond!: number,
    millisecond!: number,
    second!: number,
    minute!: number,
    hour!: number,
    day!: number;
  [time, nanosecond] = unit(time);
  [time, microsecond] = unit(time);
  [time, millisecond] = unit(time);
  [time, second] = unit(time);
  [time, minute] = unit(time);
  [time, hour] = unit(time);
  [time, day] = unit(time);
  let str = "";
  str += ustr(day, "d");
  str += ustr(hour, "h");
  str += ustr(minute, "m");
  str += ustr(second, "s");
  str += ustr(millisecond, "ms");
  // str += ustr(microsecond, "μs");
  // str += ustr(nanosecond, "ns");
  return str;
}

export function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
