import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Tag } from '@modules/models/Tag'

export const tagsApi = createApi({
  reducerPath: 'tagsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://danbooru.donmai.us',
  }),
  endpoints: (build) => ({
    getTags: build.query<Tag[], string>({
      query: (name) =>
        `tags.json?search[name_matches]=*${name}*&search[hide_empty]=true&search[order]=count&limit=1000`,
    }),
  }),
})

export const { useGetTagsQuery } = tagsApi
