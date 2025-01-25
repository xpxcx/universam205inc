import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { BrowserRouter } from 'react-router'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
  </BrowserRouter>

)
