import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const routes = createBrowserRouter([
  {
    // path: "/",
    // element: <RootPage />,
    // errorElement: <ErrorPage />,
    // children: [
    //   {
    //     index: true,
    //     element: <HomePage />,
    //   },
    // ],
  },
]);




createRoot(document.getElementById('root')!).render(
  <RouterProvider router={routes} />
)
