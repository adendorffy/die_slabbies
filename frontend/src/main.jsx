import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Schedule from "./routes/schedule";
import RSVP from "./routes/rsvp";
import Gifts from "./routes/gifts";
import FAQs from "./routes/faqs";
import Wishlist from "./routes/Wishlist";
import Reception from "./routes/reception";
import Home from "./routes/home";
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/schedule",
        element: <Schedule />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/RSVP",
        element: <RSVP />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/gifts",
        element: <Gifts />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/FAQs",
        element: <FAQs />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/reception",
        element: <Reception />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/home",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
