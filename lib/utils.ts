import { clsx, type ClassValue } from "clsx"
import { ConvexError } from "convex/values"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const handleError = (error:unknown) => {
  return error instanceof ConvexError ? error.data : "Unexpected error occurred"
}

export const formatTime = (date:number) => {
  return format(date,"p")
}