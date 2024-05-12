"use client"
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface Meta {
  onSuccess?: (data: unknown) => void
  onError?: (error: unknown) => void
  onSettled?: (data: unknown, error: unknown) => void
}

declare module '@tanstack/react-query' {
  interface QueryMeta extends Meta { }
}

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        refetchOnMount: false,
        retry: false
      }
    },
    queryCache: new QueryCache({
      onSuccess: (data, query) => {
        if (query.meta?.onSuccess) {
          query.meta?.onSuccess?.(data)
        }
      },
      onError: (error, query) => {
        if (query.meta?.onError) {
          query.meta?.onError?.(error)
        }
      },
      onSettled: (data, error, query) => {
        if (query.meta?.onSettled) {
          query.meta?.onSettled?.(data, error)
        }
      }
    })
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
export default ReactQueryProvider