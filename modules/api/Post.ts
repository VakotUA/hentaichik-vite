import { Post } from '@modules/models/Post'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://danbooru.donmai.us',
  }),
  endpoints: (build) => ({
    getPosts: build.query<Post[], { tags: string; limit: number; page: number }>({
      query: ({ tags, limit, page }) => `posts.json?limit=${limit}&page=${page}&tags=${tags}`,
    }),
    getPostsCount: build.query<number, { tags: string }>({
      query: ({ tags }) => `counts/posts.json?tags=${tags}`,
      transformResponse: (response: { counts: { posts: number } }) => response.counts.posts,
    }),
    getPostsByIDs: build.query<Post[], number[]>({
      queryFn: async (ids, _queryApi, _extraOptions, fetchWithBQ) => {
        const promises = ids.map((id) => fetchWithBQ(`posts/${id}.json`))
        const responses = await Promise.all(promises)
        return { data: responses.map((response) => response.data as Post) }
      },
    }),
    getPost: build.query<Post, number>({
      query: (id) => `posts/${id}.json`,
    }),
    getRandomPost: build.query<Post, void>({
      query: () => `posts/random.json`,
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostsCountQuery,
  useGetPostsByIDsQuery,
  useGetPostQuery,
  useGetRandomPostQuery,
} = postsApi
