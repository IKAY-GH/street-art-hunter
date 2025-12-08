import { Link } from "react-router";
import "../assets/styles/page-layout.css";
import "./Erreur.css";

/**
 * Error page - displays 404 or unauthorized access message
 * Shown when user navigates to non-existent route or restricted page
 */
export default function Erreur() {
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <h1 className="erreur-title">404</h1>
        <p className="page-text">
          Oups ! Cette page est introuvable ou votre accés n'y est pas autorisé
        </p>
        <Link to="/" className="button">
          ⬅️ Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
