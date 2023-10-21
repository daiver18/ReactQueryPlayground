import { queryKeys } from "@/utils/queryKeysFactory";
import { useQuery } from "@tanstack/react-query"
import { CustomQueryOptions } from "../types";

export type Res = Array<{ id: number }>

const getPosts = async (): Promise<Res> => {
  return fetch('https://jsonplaceholder.typicode.com/posts').then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Something went wrong');
  }).catch((error) => { })
}

export const useFetchPosts = (options?: CustomQueryOptions<Res>) => {
  const { onSuccess, onError, onSettled, ...rest } = options || {}
  return useQuery({
    queryKey: queryKeys.posts,
    queryFn: getPosts,
    meta: { onSuccess, onError, onSettled },
    ...rest,
  })
}