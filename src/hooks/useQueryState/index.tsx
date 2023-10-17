'use client'
import { Query, QueryKey, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { intersection, isEqual } from 'underscore'

type useQueryStateProps = {
  queryKey: QueryKey,
  exact?: boolean
}

const isMatch = (queryKey: QueryKey, key: QueryKey, exact?: boolean): boolean => {
  const intercepts = intersection(queryKey, key)
  if (exact) return isEqual(queryKey, intercepts)
  return isEqual(key, intercepts)
}

function useQueryState({ queryKey, exact = false }: useQueryStateProps) {
  const [query, setQuery] = useState<Query | null>(null)
  const queryClient = useQueryClient()
  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (isMatch(event.query.queryKey, queryKey, exact)) {
        setQuery(event.query)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [queryKey])
  return query
}
export default useQueryState