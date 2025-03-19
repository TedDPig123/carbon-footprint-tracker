import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ShowLoggerProvider } from './contexts/ShowLogger.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ShowLoggerProvider>
      <App />
    </ShowLoggerProvider>
  </StrictMode>,
)
