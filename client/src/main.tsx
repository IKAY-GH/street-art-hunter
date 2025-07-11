import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import App from "./App";
import CGU from "./pages/Cgu";
import Chasse from "./pages/Chasse";
import Equipe from "./pages/Equipe";
import Erreur from "./pages/Erreur";
import Instructions from "./pages/Instructions";

import MentionsLegales from "./pages/MentionsLegales";
import Classement from "./pages/classement";

import Accueil from "./pages/accueil";
import Gallerie from "./pages/gallerie";
import Info from "./pages/info";

import Administrateur from "./pages/administrateur";

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
        element: <Administrateur />,
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

      // {
      //   path: "/carte",
      //   element: <Carte />,
      // },

      {
        path: "/infos",
        element: <Info />,
      },

      {
        path: "/classement",
        element: <Classement />,
      },

      // {
      //   path: "/connexion",
      //   element: <Formulaire />,
      // },

      {
        path: "/cgu",
        element: <CGU />,
      },

      {
        path: "/mentions-Legales",
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
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
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
