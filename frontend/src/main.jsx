import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import Schedule from "./routes/schedule";
import RSVP from "./routes/rsvp";
import Gifting from "./routes/gifting";
import FAQs from "./routes/faqs";
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
        path: "/Gifting",
        element: <Gifting />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/FAQs",
        element: <FAQs />,
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
