import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { ptBR } from '@clerk/localizations'
import ShopContextProvider from './context/ShopContext.jsx'
import { MotionConfig } from 'motion/react'



// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Publishable Key ausente')
}



createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} localization={ptBR} >
    <BrowserRouter>
      <ShopContextProvider>
        <MotionConfig viewport={{once: true}}>
          <App />
        </MotionConfig>
      </ShopContextProvider>
    </BrowserRouter>
  </ClerkProvider>  
)
