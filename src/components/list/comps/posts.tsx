import { useFetchPosts } from '@/services/posts'
import React from 'react'

const Posts = ({ id }: { id?: number }) => {
  const { data: posts, isSuccess } = useFetchPosts()

  if (!isSuccess && !posts) return <div>No success getting  list of post</div>
  return (
    <div>List of post reached</div>
  )
}

export default Posts