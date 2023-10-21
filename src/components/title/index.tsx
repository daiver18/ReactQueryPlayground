'use client'
import { QueryKey, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { isEmpty } from 'underscore'
import useQueryState from '@/hooks/useQueryState'
import { queryKeys as queryKeysFactory } from '@/utils/queryKeysFactory'

function Title() {
  const [queryKeys, setQueryKeys] = useState<{ [key in string]: QueryKey }>({})
  const postsQueryState = useQueryState({ queryKey: queryKeysFactory.posts })
  const commentsQueryState = useQueryState({ queryKey: queryKeysFactory.comments })
  const queryClient = useQueryClient()

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