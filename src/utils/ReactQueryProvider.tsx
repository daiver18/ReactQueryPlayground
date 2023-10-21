"use client"
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import { Res } from '@/services/posts'
interface Meta {
  onSuccess?: <T extends Res>(data: T) => void
  onError?: (data: any) => void
  onSettled?: (data: any) => void
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
          query.meta?.onSuccess?.(data as any)
        }
      },
      onError: (error, query) => {
        if (query.meta?.onError) {
          query.meta?.onError?.(error)
        }
      },
      onSettled: (data, error, query) => {
        if (query.meta?.onSettled) {
          query.meta?.onSettled?.(data)
        }
      }
    })
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
export default ReactQueryProvider