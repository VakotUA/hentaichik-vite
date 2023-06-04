import Main from '@components/Layouts/Main'
import { persistor, store } from '@modules/store/store'
import ErrorPage from '@pages/error'
import FavoritePage from '@pages/favorite'
import MainPage from '@pages/index'
import '@styles/globals.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename="hentaichik-vite">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Main>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/favorite" element={<FavoritePage />} />
              <Route path="/404" element={<ErrorPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Main>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
