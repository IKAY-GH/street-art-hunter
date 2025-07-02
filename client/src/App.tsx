// src/App.tsx
import { Outlet } from "react-router";
import Footer from "./components/FooterComponent";

export default function App() {
  return (
    <>
      <main>
        <Outlet />{" "}
        {/* Ici s'afficheront les composants des pages (Carte, Home, etc.) */}
      </main>

      <Footer />
    </>
  );
}
