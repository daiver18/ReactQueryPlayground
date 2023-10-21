"use client"
import { useFetchComments } from '@/services/comments'
import { useFetchPosts } from '@/services/posts'
import React from 'react'
import { isEmpty } from 'underscore'

function List() {
  const { data: posts, isLoading: loadingPost } = useFetchPosts({ onSuccess: (data) => { console.log("this onSuccess", data) } })
  const { data: comments, isLoading: loadingComments } = useFetchComments()
  if (loadingPost || loadingComments) {
    return <div>Is loading data...</div>
  }
  if (isEmpty(posts)) {
    return <div>error getting posts</div>
  }
  if (isEmpty(comments)) {
    return <div>error getting comments</div>
  }
  return (
    <>
      <span>Posts</span>
      <ul>
        {posts?.map((item) => {
          return <li key={item.id}>
            <span>User id: {item.id}</span>
          </li>
        })}
      </ul>
    </>
  )
}

export default List