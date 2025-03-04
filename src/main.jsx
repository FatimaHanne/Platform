import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashbord from './pages/dashbord/Dashbord.jsx';
import Inscription from './pages/inscription/Inscription.jsx';
import Connexion from './pages/connexion/Connexion.jsx';
import { Toaster } from 'react-hot-toast';
import "./main.css";
import { red } from '@mui/material/colors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Création de l'objet browserRouter
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashbord />,
  },
  {
    path: "/inscription",
    element: <Inscription />,
  },
  {
    path: "/connexion",
    element: <Connexion />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <Toaster />
     {/* Fournir le RouterProvider ici */}
     <RouterProvider router={router} />
    </QueryClientProvider> 
  </StrictMode>
);
