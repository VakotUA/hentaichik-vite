import Main from '@components/Layouts/Main'
import { store } from '@modules/store/store'
import ErrorPage from '@pages/error'
import MainPage from '@pages/index'
import '@styles/globals.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/404" element={<ErrorPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Main>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
