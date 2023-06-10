import { persistor, store } from '@modules/store/store'
import ErrorPage from '@pages/Error'
import FavoritePage from '@pages/Favorite'
import MainPage from '@pages/Main'
import PostPage from '@pages/Post'
import Page from '@pages/index'
import '@styles/globals.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

const router = createHashRouter([
  {
    path: '/',
    element: <Page page={<MainPage />} />,
    errorElement: <Page page={<ErrorPage />} />,
    children: [
      {
        path: 'post/:id',
        element: <PostPage />,
      },
    ],
  },
  {
    path: 'favorite',
    element: <Page page={<FavoritePage />} />,
    errorElement: <Page page={<ErrorPage />} />,
    children: [
      {
        path: 'post/:id',
        element: <PostPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
