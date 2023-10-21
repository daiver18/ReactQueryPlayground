import { QueryOptions } from "@tanstack/react-query"

export type CustomQueryOptions<T> = Omit<QueryOptions<T>, "queryKey" | "queryFn" | "meta"> & {
  onSuccess?: (data: T) => void
  onError?: (data: T) => void
  onSettled?: (data: T) => void
}