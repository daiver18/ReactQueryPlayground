import { useFetchPosts } from '@/services/posts'
import React from 'react'

const Comp = () => {
  const { data: posts, isSuccess } = useFetchPosts({ onSuccess: (data) => { console.log("this onSuccess in comp", data) }, })

  if (!isSuccess && !posts) return <div> no success</div>
  return (
    <div>Data gotten</div>
  )
}

export default Comp