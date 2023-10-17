'use client'
import { QueryKey, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { queryKey, queryKey2 } from '../list'
import { isEmpty } from 'underscore'
import useQueryState from '@/hooks/useQueryState'

function Title() {
  const [queryKeys, setQueryKeys] = useState<{ [key in string]: QueryKey }>({})
  const postsQueryState = useQueryState({ queryKey })
  const commentsQueryState = useQueryState({ queryKey: queryKey2 })
  const queryClient = useQueryClient()

  console.log(commentsQueryState)

  if (postsQueryState?.state.status === "error" && !queryKeys[postsQueryState.queryKey.toString()]) {
    setQueryKeys(prev => ({ ...prev, [postsQueryState.queryKey.toString()]: postsQueryState.queryKey }))
  }
  if (commentsQueryState?.state.status === "error" && !queryKeys[commentsQueryState.queryKey.toString()]) {
    setQueryKeys(prev => ({ ...prev, [commentsQueryState.queryKey.toString()]: commentsQueryState.queryKey }))
  }

  async function handleReFetch() {
    setQueryKeys({})
    for (const key in queryKeys) {
      await queryClient.refetchQueries({ queryKey: queryKeys[key] })
    }
  }
  return (
    <>
      <div>Title</div>
      {!isEmpty(queryKeys) && <><span>
        queries should be reload -
      </span> <button onClick={handleReFetch}>Reload</button></>}
    </>
  )
}

export default Title