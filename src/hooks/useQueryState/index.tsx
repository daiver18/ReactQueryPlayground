'use client'
import { Query, QueryKey, useQueryClient, matchQuery, QueryObserver, QueryObserverResult, QueryCacheNotifyEvent, QueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'

type useQueryStateProps = {
  queryKey: QueryKey,
  exact: true
  callback?: (query: QueryObserverResult<unknown, Error>) => void
} | {
  queryKey: QueryKey,
  exact: false
  callback?: (query: Query<any, any, any, any>) => void;
}

const typesOmitted: Array<QueryCacheNotifyEvent["type"]> = ["observerAdded", "observerOptionsUpdated", "observerRemoved", "observerResultsUpdated"]


function useQueryState({ queryKey, exact, callback }: useQueryStateProps) {
  const [query, setQuery] = useState<null | QueryObserverResult>(null)
  const observer = useRef<QueryObserver | null>(null)

  const queryClient = useQueryClient()

  const addObserver = useCallback(
    () => { observer.current = new QueryObserver(queryClient, { queryKey }) },
    [queryClient, queryKey],
  )
  const handleSubObserver = useCallback(
    () => {
      if (!observer.current) return null
      return observer.current.subscribe((result) => {
        if (exact === true) callback?.(result)
        setQuery(result)
      })
    },
    [exact, callback],
  )


  useEffect(() => {
    const found = queryClient.getQueryCache().find({ queryKey, exact })
    console.log("change queryKey", queryKey)
    if (!!found && exact) {
      addObserver()
      const unsubscribe = handleSubObserver()
      return () => { unsubscribe?.() }
    } else {
      const unsubscribeCache = queryClient.getQueryCache().subscribe((event) => {
        if (typesOmitted.includes(event.type)) return

        const match = matchQuery({ queryKey, exact }, event.query)

        // predicate: (query) => {
        //   console.log("predicate", query)
        //   return true
        // }

        if (match && !observer.current && exact) {
          addObserver()
          const unsubscribe = handleSubObserver()
          unsubscribeCache()
          return () => { unsubscribe?.() }
        }

        if (match && exact === false) {
          callback?.(event.query)
        }
      })
      return () => { unsubscribeCache() }
    }
  }, [queryKey, addObserver, handleSubObserver, queryClient])
  return query
}
export default useQueryState