import { queryKeys } from "@/utils/queryKeysFactory";
import { useQuery, UseQueryResult } from "@tanstack/react-query"
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

export const useFetchPosts = (options?: CustomQueryOptions<Res>): UseQueryResult<Res> => {
  const { onSuccess, onError, onSettled, ...rest } = options || {}
  return useQuery<Res>({
    queryKey: queryKeys.posts,
    queryFn: getPosts,
    meta: {
      onSuccess: (data) => options?.onSuccess?.(data),
      onError,
      onSettled
    },
    ...rest,
  })
}