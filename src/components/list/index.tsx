"use client"
import { dehydrate, QueryClient, QueryKey, useQuery } from '@tanstack/react-query'
import React from 'react'
import { isEmpty } from 'underscore'
export const queryKey: QueryKey = ["post"]
export const queryKey2: QueryKey = ["comments"]

const getPosts = async (): Promise<Array<{ id: number }>> => {
  return fetch('https://jsonplaceholder.typicode.com/posts').then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Something went wrong');
  }).catch((error) => {
  })
}
const getComments = async (): Promise<Array<{ id: number }>> => {
  return fetch('https://jsonplaceholder.typicode.com/comments').then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Something went wrong');
  }).catch((error) => {
  })
}

function List() {
  const { data: posts, isLoading: loadingPost } = useQuery<Array<{ id: number }>>({ queryKey: queryKey, queryFn: getPosts, refetchOnWindowFocus: false, refetchIntervalInBackground: false, refetchOnMount: false, retry: false })
  const { data: comments, isLoading: loadingComments } = useQuery<Array<{ id: number }>>({ queryKey: [...queryKey2, 1, {page: 1}], queryFn: getComments, refetchOnWindowFocus: false, refetchIntervalInBackground: false, refetchOnMount: false, retry: false })
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


export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(queryKey, getUsers)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}