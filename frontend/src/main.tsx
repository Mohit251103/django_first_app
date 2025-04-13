import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext.tsx'
import { NoteProvider } from './context/NoteContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <NoteProvider >
          <App />
        </NoteProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
