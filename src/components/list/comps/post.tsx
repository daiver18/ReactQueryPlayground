import { useFetchPost, useFetchPosts } from '@/services/posts'
import React from 'react'

const Posts = ({ id }: { id: number }) => {
  const { data: posts, isSuccess } = useFetchPost(id)

  if (!isSuccess && !posts) return <div>No success getting post</div>
  return (
    <div>post reached</div>
  )
}

export default Posts