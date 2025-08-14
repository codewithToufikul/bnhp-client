import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './pages/Router.jsx'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './component/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
     <RouterProvider router={router} />
     <Toaster/>
   </AuthProvider>
  </StrictMode>,
)
