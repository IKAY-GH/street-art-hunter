import { Link } from "react-router-dom";
import "../assets/styles/page-layout.css";

export default function Instructions() {
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <h1 className="page-title">Instructions de la Chasse au Street Art</h1>
        <p className="page-text">
          Bienvenue dans la chasse au Street Art ! Voici comment jouer :
        </p>
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
          aria-Label="Bouton commencer la chasse"
          className="form-button"
        >
          Commencer la chasse
        </Link>
      </div>
    </div>
  );
}
