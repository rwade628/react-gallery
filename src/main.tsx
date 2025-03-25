import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fontsource/inter";

import ErrorPage from "./routes/error-page";
import Root from "./routes/root";
import Gallery from "./routes/gallery";

const galleryLoader = async () => {
  const res = await fetch(`/v2/galleries?orderBy=newest`);
  if (res.status === 404) {
    throw new Response("Not Found", { status: 404 });
  }
  const galleries = await res.json();
  return galleries;
};

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: galleryLoader,
    children: [
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/:page?",
        element: <Gallery />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
