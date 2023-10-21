import { queryKeys } from "@/utils/queryKeysFactory";
import { useQuery } from "@tanstack/react-query"
import { CustomQueryOptions } from "../types";

type Res = Array<{ id: number }>

const getComments = async (): Promise<Res> => {
  return fetch('https://jsonplaceholder.typicode.com/comments').then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Something went wrong');
  }).catch((error) => { })
}

export const useFetchComments = (options?: CustomQueryOptions<Res>) => {
  return useQuery<Res>({ queryKey: queryKeys.comments, queryFn: getComments, ...options })
}