// lib/utils.ts
import { type ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge de classes com Tailwind, evitando conflitos */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
