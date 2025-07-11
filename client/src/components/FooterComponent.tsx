import "./FooterComponent.css";
import { Link } from "react-router";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {year} Street Art Hunter – Tous droits réservés</p>
      <ul className="footer-links">
        <li>
          <Link to="/mentions-legales">Mentions légales</Link>
        </li>
        <li>
          <Link to="/cgu">CGU</Link>
        </li>
        <li>
          <Link to="/equipe">L'équipe</Link>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/ridouane-z-0452a2361/" // mettre votre url linkedin
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
