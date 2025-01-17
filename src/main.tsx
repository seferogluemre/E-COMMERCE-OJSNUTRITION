import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AboutPage,
  ContactPage,
  HomePage,
  ProductDetailPage,
  ProductsPage,
  RootPage,
  SSSPage,
} from "./routes/pages/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { loader } from "./assets/components/layout/BestSeller/loader";
import ErrorPage from "./routes/pages/error-page";
import { allProductLoader } from "./routes/pages/Products/loader";
import { ProductDetailLoader } from "./routes/pages/ProductDetail/ProductDetailLoader";

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
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/SSS",
        element: <SSSPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={routes} />
);
