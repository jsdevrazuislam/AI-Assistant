import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const extractScheduleFromResponse = (rawResponse: string): string[] => {
  const plainTextBlock = rawResponse.match(/```python([\s\S]*?)```/);

  if (!plainTextBlock) {
    return [];
  }

  return plainTextBlock[1]
    .split("\n")
    .map(line => line.trim().replace(/"/g, ''))
    .filter(line => line.length > 0);
}
