'use client'
import { QueryKey, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { isEmpty } from 'underscore'
import useQueryState from '@/hooks/useQueryState'
import { queryKeys as queryKeysFactory } from '@/utils/queryKeysFactory'

function Title() {
  const postsQueryState = useQueryState({ queryKey: queryKeysFactory.posts })
  // const commentsQueryState = useQueryState({ queryKey: queryKeysFactory.comments })
  // if (commentsQueryState?.state.status === "error" && !queryKeys[commentsQueryState.queryKey.toString()]) {
  //   setQueryKeys(prev => ({ ...prev, [commentsQueryState.queryKey.toString()]: commentsQueryState.queryKey }))
  // }

  useEffect(() => {
  
    console.log({ postsQueryState })
    
  }, [postsQueryState])
  

  return (
    <>
      <div>Title</div>
    </>
  )
}

export default Title