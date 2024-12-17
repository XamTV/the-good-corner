import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import AdPage from "./pages/AdPage.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import NewAd from "./pages/NewAd.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "ads/:id",
        element: <AdPage />,
      },
      {
        path: "categories/:id",
        element: <CategoryPage />,
      },
      {
        path: "ads/new",
        element: <NewAd />,
      },
      {
        path: "ads/:id/edit",
        element: <NewAd />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
