import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Welcome from './pages/Welcome.tsx';
import Add from './pages/Add.tsx';
import List from './pages/List.tsx';

 const router = createBrowserRouter([
  { path: "/", Component: Welcome},
  { path: "/add", Component: Add },
  { path: "/list", Component: List },
]);

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
);