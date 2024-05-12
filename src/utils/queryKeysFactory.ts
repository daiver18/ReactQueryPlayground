export const queryKeys = {
  posts: ["posts"],
  post: (id: number) => [...queryKeys.posts, id],
  comments: ["comments"]
}