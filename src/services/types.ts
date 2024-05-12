import { UseQueryOptions } from "@tanstack/react-query"

export type CustomQueryOptions<T> = Omit<UseQueryOptions<T>, "queryKey" | "queryFn" | "meta"> & {
  onSuccess?: (data: T) => void
  onError?: (data: T) => void
  onSettled?: (data: T) => void
}