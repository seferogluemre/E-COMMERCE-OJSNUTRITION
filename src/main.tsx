import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AboutPage,
  AccountPage,
  ContactPage,
  HomePage,
  LoginPage,
  PaymentPage,
  RootLayout,
  SSSPage,
} from "./routes/pages/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { loader } from "./components/layout/BestSeller/loader";
import ErrorPage from "./routes/pages/error-page";
import { allProductLoader } from "./routes/pages/Products/loader";
import { ProductDetailLoader } from "./routes/pages/ProductDetail/ProductDetailLoader";
import React from "react";

const LazyProductPage = React.lazy(
  () => import("./routes/pages/Products/Products")
);

const LazyProductDetailPage = React.lazy(
  () => import("./routes/pages/ProductDetail/ProductDetail")
);

const routes = createBrowserRouter([
  {
    path: "/payment",
    element: <PaymentPage />,
  },
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: loader,
        element: <HomePage />,
      },
      {
        path: "/account",
        element: <AccountPage />,
      },
      {
        path: "/products",
        loader: allProductLoader,
        element: (
          <React.Suspense>
            <LazyProductPage />
          </React.Suspense>
        ),
      },
      {
        path: "/products/:productSlug",
        element: (
          <React.Suspense>
            <LazyProductDetailPage />
          </React.Suspense>
        ),
        loader: ProductDetailLoader,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
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
