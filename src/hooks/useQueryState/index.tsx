'use client'
import { Query, QueryKey, useQueryClient, matchQuery, QueryObserver, QueryObserverResult, QueryCacheNotifyEvent, QueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

type useQueryStateProps = {
  queryKey: QueryKey,
  exact?: boolean
}

const typesOmitted: Array<QueryCacheNotifyEvent["type"]> = ["observerAdded", "observerOptionsUpdated", "observerRemoved", "observerResultsUpdated"]

const addObserver = <T,>(queryClient: QueryClient, queryKey: useQueryStateProps["queryKey"], action: T) => {
  const observer = new QueryObserver(queryClient, { queryKey })
  const unsubscribe = observer.subscribe((result) => {
    console.log("from observer", result)
    action(result)
  })
  return { observer, unsubscribe }
}

function useQueryState({ queryKey, exact = false }: useQueryStateProps) {
  const [query, setQuery] = useState<null | QueryObserverResult>(null)
  const queryClient = useQueryClient()
  useEffect(() => {
    let observer: QueryObserver
    const found = queryClient.getQueryCache().find({ queryKey, exact: true })
    if (!!found) {
      observer = new QueryObserver(queryClient, { queryKey })
      const unsubscribe = observer.subscribe((result) => {
        console.log("from observer", result)
        setQuery(result)
      })
      return () => {
        console.log("called unsubscribe")
        unsubscribe()
      }
    } else {
      const unsubscribeCache = queryClient.getQueryCache().subscribe((event) => {
        const match = matchQuery({ queryKey, exact }, event.query)
        if (match && !typesOmitted.includes(event.type) && !observer) {
          console.log("called first if")
          observer = new QueryObserver(queryClient, { queryKey })
          const unsubscribe = observer.subscribe((result) => {
            console.log("from queryCatch in observer", result)
            setQuery(result)
          })
          unsubscribeCache()
          return () => {
            console.log("called unsubscribe")
            unsubscribe()
          }
        }
        if (match && event.type === "removed") { observer.destroy() }
        console.log("called getQueryCache sub")
      })
      return () => {
        unsubscribeCache()
      }
    }
  }, [queryKey])
  return query
}
export default useQueryState