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
} from "./routes/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sass/style.scss";
import { loader } from "./components/BestSeller/loader";
import ErrorPage from "./routes/error-page";
import { allProductLoader } from "./routes/Products/loader";
import { ProductDetailLoader } from "./routes/ProductDetail/ProductDetailLoader";
import React from "react";
import { CategoryProductsLoaader } from "./routes/CategoryProducts/CategoryProductsLoader";


const LazyProductPage = React.lazy(
  () => import("./routes/Products/Products")
);

const LazyProductDetailPage = React.lazy(
  () => import("./routes/ProductDetail/ProductDetail")
);

const LazyCategoryProductsPage=React.lazy(
  ()=>import("./routes/CategoryProducts/CategoryProducts")
)

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
        path: "/products/category/:main_category",
        element: (
          <React.Suspense>
            <LazyCategoryProductsPage />
          </React.Suspense>
        ),
        loader: CategoryProductsLoaader,
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