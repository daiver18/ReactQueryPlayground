"use client"
import { useFetchComments } from '@/services/comments'
import { useFetchPosts } from '@/services/posts'
import React, { useEffect, useState } from 'react'
import { isEmpty } from 'underscore'
import Posts from './comps/posts'
import Post from './comps/post'

function List() {
  const [renderDelayedComponent, setRenderDelayedComponent] = useState(false);

  // const { data: posts, isLoading: loadingPost } = useFetchPosts({ onSuccess: (data) => { console.log("this onSuccess in list", data) } })
  // const { data: comments, isLoading: loadingComments } = useFetchComments()
  // if (loadingPost || loadingComments) {
  //   return <div>Is loading data...</div>
  // }
  // if (isEmpty(posts)) {
  //   return <div>error getting posts</div>
  // }
  // if (isEmpty(comments)) {
  //   return <div>error getting comments</div>
  // }
  useEffect(() => {
    const timer = setTimeout(() => {
      setRenderDelayedComponent(true);
    }, 5000); // 5000 milisegundos = 5 segundos

    return () => clearTimeout(timer); // Limpiar el timer en caso de que el componente se desmonte antes de que se complete el tiempo de espera
  }, []);


  // if (!renderDelayedComponent) return null

  return (
    <div>
      {renderDelayedComponent && <Posts />}
      {renderDelayedComponent && <Post id={1} />}
      <button onClick={() => setRenderDelayedComponent(!renderDelayedComponent)} title='hidden/show' >hidden/show</button>
    </div>
  );
};

export default List