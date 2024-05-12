'use client'
import React, { useEffect } from 'react'
import useQueryState from '@/hooks/useQueryState'
import { queryKeys as queryKeysFactory } from '@/utils/queryKeysFactory'

function Title() {
  const postsQueryState = useQueryState({
    queryKey: queryKeysFactory.posts, exact: true, callback: (query) => {
      console.log("this is a callback", query)
    }
  })

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