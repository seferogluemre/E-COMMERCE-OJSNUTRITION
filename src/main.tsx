import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage, RootPage } from './assets/pages';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);




createRoot(document.getElementById('root')!).render(
  <RouterProvider router={routes} />
)
