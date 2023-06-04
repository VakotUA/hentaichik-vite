import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { postsApi } from '@modules/api/Post'
import { tagsApi } from '@modules/api/Tag'
import tags from '@modules/store/reducers/tags'

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    tags,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware, tagsApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
