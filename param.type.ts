// deno-fmt-ignore
type Illegal = " " | "!" | "#" | "%" | "&" | "(" | ")" | "*" | "+" | "," | "-" | "." | "/" | ";" | "<" | "=" | ">" | "?" | "@" | "[" | "]" | "^" | "_" | "{" | "|" | "}" | "~" | " " | "¡" | "¢" | "£" | "¤" | "¥" | "¦" | "§" | "¨" | "©" | "«" | "¬" | "­" | "®" | "¯" | "°" | "±" | "²" | "³" | "´" | "¶" | "·" | "¸" | "¹" | "»" | "¼" | "½" | "¾" | "¿" | "×" | "÷" | "'" | '"' | "`";
// deno-fmt-ignore
type Legal = "ø" | "ù" | "ú" | "û" | "ü" | "ý" | "þ" | "ÿ" | "$" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "ª" | "µ" | "º" | "À" | "Á" | "Â" | "Ã" | "Ä" | "Å" | "Æ" | "Ç" | "È" | "É" | "Ê" | "Ë" | "Ì" | "Í" | "Î" | "Ï" | "Ð" | "Ñ" | "Ò" | "Ó" | "Ô" | "Õ" | "Ö" | "Ø" | "Ù" | "Ú" | "Û" | "Ü" | "Ý" | "Þ" | "ß" | "à" | "á" | "â" | "ã" | "ä" | "å" | "æ" | "ç" | "è" | "é" | "ê" | "ë" | "ì" | "í" | "î" | "ï" | "ð" | "ñ" | "ò" | "ó" | "ô" | "õ" | "ö";
type Delimeter = ":";

type E = "";

// deno-fmt-ignore
export type RemoveExcess<S extends string>    =
S extends `${infer P}${Illegal}${infer _}`  ? RemoveExcess<P> :
S;

// deno-fmt-ignore
export type ParamExtractor<S extends string, Params extends string[]>     =
S extends `${Illegal}${infer R}`                                 ? ParamExtractor<R,     Params                  > :
S extends `${Legal}${infer R}`                                   ? ParamExtractor<R,     Params                  > :
S extends `${Delimeter}${Illegal}${infer R}`                     ? ParamExtractor<R,     Params                  > :
S extends `${Delimeter}${infer P}${Illegal}${infer R}`           ? ParamExtractor<R, [...Params, RemoveExcess<P>]> :
S extends `${Delimeter}${infer P}${Illegal}`                     ? ParamExtractor<E, [...Params, RemoveExcess<P>]> :
S extends `${Delimeter}${infer P}`                               ? ParamExtractor<E, [...Params, RemoveExcess<P>]> :
Params;

// deno-fmt-ignore
export type ParamUnion<Params extends string[]> = { [Index in keyof Params]: Params[Index] }[number];

// deno-fmt-ignore
export type ParamUnionToObject<Union extends string> = { [Key in Union]: string };

// deno-fmt-ignore
export type ParamParser<S extends string> = ParamUnionToObject<ParamUnion<ParamExtractor<S, []>>>;
