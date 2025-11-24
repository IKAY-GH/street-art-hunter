import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./assets/styles/global.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext.tsx";
import Connexion from "./pages/Auth/connexion.tsx";
import Inscription from "./pages/Auth/inscription.tsx";
import CGU from "./pages/footer/Cgu";
import Chasse from "./pages/Chasse";
import Equipe from "./pages/footer/Equipe";
import Erreur from "./pages/Erreur";
import Instructions from "./pages/Instructions";
import MapComponent from "./pages/MapComponent";
import MentionsLegales from "./pages/footer/MentionsLegales.tsx";
import Accueil from "./pages/accueil";
import AdminRoute from "./routes/adminRoute.tsx";
import Administrateur from "./pages/administrateur/administrateur.tsx";
import Classement from "./pages/classement";
import Gallerie from "./pages/gallerie";
import Profil from "./pages/Profil";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Accueil />,
      },
      {
        path: "/administrateur",
        element: (
          <AdminRoute>
            <Administrateur />
          </AdminRoute>
        ),
      },

      {
        path: "/carte",
        element: <MapComponent />,
      },

      {
        path: "/gallerie",
        element: <Gallerie />,
      },
      {
        path: "/instructions",
        element: <Instructions />,
      },
      {
        path: "/chasse",
        element: <Chasse />,
      },
      {
        path: "/connexion",
        element: <Connexion />,
      },

      {
        path: "/inscription",
        element: <Inscription />,
      },

      {
        path: "/classement",
        element: <Classement />,
      },

      {
        path: "/Cgu",
        element: <CGU />,
      },

      {
        path: "/Mentions-Legales",
        element: <MentionsLegales />,
      },

      {
        path: "/equipe",
        element: <Equipe />,
      },
      {
        path: "/erreur",
        element: <Erreur />,
      },
      {
        path: "/Profil",
        element: (
          <ProtectedRoute>
            <Profil />,
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
