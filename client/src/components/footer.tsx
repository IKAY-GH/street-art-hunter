import { Link } from "react-router";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer-left">
        © {year} Street Art Hunter – Tous droits réservés
      </p>
      <div className="footer-links">
        <Link to="/mentions-legales">Mentions légales</Link>
        <Link to="/cgu">CGU</Link>
        <Link to="/equipe">L'équipe</Link>
      </div>
    </footer>
  );
}
