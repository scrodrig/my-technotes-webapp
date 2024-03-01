import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './App.jsx'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import { store } from './app/store'

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') disableReactDevTools()
if (import.meta.NODE_ENV === 'production') disableReactDevTools()

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)
