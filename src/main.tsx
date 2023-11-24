import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fontsource/inter";

import { useGalleryStore } from "./state/gallery";

import Root from "./routes/root";
import Gallery from "./routes/gallery";
import Lightbox from "./routes/lightbox";

const loader = async () => {
  const existingGalleries = useGalleryStore.getState().galleries;
  if (existingGalleries.length === 0) {
    const res = await fetch(`api/galleries`);
    if (res.status === 404) {
      throw new Response("Not Found", { status: 404 });
    }
    const galleries = await res.json();
    useGalleryStore.setState({ galleries: galleries });
    return galleries;
  }
  return existingGalleries;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/:page?",
        element: <Gallery />,
        loader: loader,
        children: [
          {
            path: "modal/:index",
            element: <Lightbox />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
