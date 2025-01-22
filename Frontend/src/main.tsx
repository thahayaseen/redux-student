import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import('./App.css')
import App from './App.tsx'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <ToastContainer />
    <App />
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
