import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routers/router.jsx'
import AOS from 'aos';
import 'aos/dist/aos.css';
import AuthProvider from './context/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
AOS.init();
createRoot(document.getElementById('root')).render(
  <StrictMode>
<QueryClientProvider client={queryClient}>
  <AuthProvider>
  <Toaster/>
      <RouterProvider router={router}>
    </RouterProvider>
</AuthProvider>
</QueryClientProvider>
  </StrictMode>,
)
