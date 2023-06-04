import { postsApi } from '@modules/api/Post'
import { tagsApi } from '@modules/api/Tag'
import favorite from '@modules/store/reducers/favorite'
import tags from '@modules/store/reducers/tags'
import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/es/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  [postsApi.reducerPath]: postsApi.reducer,
  [tagsApi.reducerPath]: tagsApi.reducer,
  tags,
  favorite,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      postsApi.middleware,
      tagsApi.middleware
    ),
})
export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
