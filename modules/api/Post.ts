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
  }),
})

export const { useGetPostsQuery, useGetPostsCountQuery } = postsApi
