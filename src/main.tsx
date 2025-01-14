import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomePage,
  ProductDetailPage,
  ProductsPage,
  RootPage,
} from "./assets/pages/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { loader } from "./assets/components/layout/BestSeller/loader";
import ErrorPage from "./assets/pages/error-page";
import { allProductLoader } from "./assets/pages/Products/loader";
import { ProductDetailLoader } from "./assets/pages/ProductDetail/ProductDetailLoader";

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
      {
        path: "/products",
        loader: allProductLoader,
        element: <ProductsPage />,
      },
      {
        path: "/products/:productSlug",
        element: <ProductDetailPage />,
        loader: ProductDetailLoader,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={routes} />
);
