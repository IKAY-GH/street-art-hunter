import { Link } from "react-router-dom";
import "../assets/styles/page-layout.css";
import { useAuth } from "../context/AuthContext";
import React, { useState } from "react";

/**
 * Instructions page - explains game rules and how to play
 * Displays game instructions and start button (authentication required)
 */
export default function Instructions() {
  const { isAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);

  // Prevent unauthenticated users from starting the hunt
  const handleStartClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setError("Veuillez vous inscrire pour continuer");
    } else {
      setError("");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <h1 className="page-title">Instructions de la Chasse au Street Art</h1>
        <h2>Bienvenue dans la chasse au Street Art ! Voici comment jouer :</h2>
        <ul className="page-list">
          <li>
            📸 Explore la ville et utilise ton appareil photo pour capturer des
            oeuvres de street art.
          </li>
          <li>
            🏆 Chaque photo te rapporte des points visibles sur ton profil.
          </li>
          <li>
            🔥 Publie aussi tes propres créations artistiques si tu es un street
            artiste !
          </li>
          <li>
            🌍 Un classement des meilleurs chasseurs sera bientôt disponible.
          </li>
        </ul>
        <Link
          to="/chasse"
          aria-label="Bouton commencer la chasse"
          className="button"
          onClick={handleStartClick}
        >
          Commencer la chasse
        </Link>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}
