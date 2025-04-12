import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const extractScheduleFromResponse = (rawResponse: string): string[] => {
  return JSON.parse(rawResponse)
    .map((line:string) => line.trim().replace(/"/g, ''))
}
