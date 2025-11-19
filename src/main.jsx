import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import Root from './Routes/Routes.jsx'
import { PetProvider } from './Providers/PetContext.jsx'
import AuthProvider from './Providers/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PetProvider>
      <AuthProvider>
        <RouterProvider router={Root} />
      </AuthProvider>
    </PetProvider>
  </StrictMode>,
)
