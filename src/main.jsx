import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import { GuessTheNumber } from './Component/GuessTheNumber.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <GuessTheNumber/>
  </StrictMode>,
)
