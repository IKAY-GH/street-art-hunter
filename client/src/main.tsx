import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";

/* ************************************************************************* */

// Import the main app component
import App from "./App";

import Carte from "./pages/carte";
import Classement from "./pages/classement";
// Import additional components for new routes
// Try creating these components in the "pages" folder
import Gallerie from "./pages/gallerie";
import Info from "./pages/info";

// import About from "./pages/About";
import Accueil from "./pages/accueil";

// import Contact from "./pages/Contact";
import Administrateur from "./pages/administrateur";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
  {
    // The root path
    element: <App />, // Renders the App component for the home page
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
        path: "/carte",
        element: <Carte />,
      },

      {
        path: "/infos",
        element: <Info />,
      },

      {
        path: "/classement",
        element: <Classement />,
      },
    ],
  },

  // Try adding a new route! For example, "/about" with an About component
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
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
