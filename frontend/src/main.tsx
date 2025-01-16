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
import SignInPage from "./pages/SignIn.tsx";
import SignUpPage from "./pages/SignUp.tsx";
import RequireAuth from "./hoc/requireAuth.tsx";

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
        element: (
          <RequireAuth redirectToIfNotAuth="/signin">
            <NewAd />
          </RequireAuth>
        ),
      },
      {
        path: "ads/:id/edit",
        element: (
          <RequireAuth redirectToIfNotAuth="/signin">
            <NewAd />
          </RequireAuth>
        ),
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "signin",
        element: (
          <RequireAuth>
            <SignInPage />
          </RequireAuth>
        ),
      },
      {
        path: "signup",
        element: (
          <RequireAuth requireGuest redirectToIfAuth="/">
            <SignUpPage />
          </RequireAuth>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
