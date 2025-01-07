import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage, RootPage } from "./assets/pages/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { loader } from "./assets/components/layout/BestSeller/loader";
import ErrorPage from "./assets/pages/error-page";
const routes = createBrowserRouter([
  {
    path: "/",

    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: loader,
        element: <HomePage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={routes} />
);
