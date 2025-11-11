import "./FooterComponent.css";
import { Link } from "react-router";

function MobileFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mobile-footer">
      <p>© {year}</p>
      <ul className="footer-links">
        <li>
          <Link to="mentions-legales">ML</Link>
        </li>
        <li>
          <Link to="cgu">CGU</Link>
        </li>
        <li>
          <Link to="equipe">E</Link>
        </li>
      </ul>
    </footer>
  );
}

export default MobileFooter;
