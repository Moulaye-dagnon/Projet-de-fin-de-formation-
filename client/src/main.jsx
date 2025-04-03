import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Main from './Components/Main.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Main/>
  </BrowserRouter>
)
