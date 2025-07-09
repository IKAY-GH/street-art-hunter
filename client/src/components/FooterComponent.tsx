import "./FooterComponent.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {year} Street Art Hunter – Tous droits réservés</p>
      <ul className="footer-links">
        <li>
          <a href="/mentions-legales">Mentions légales</a>
        </li>
        <li>
          <a href="/cgu">CGU</a>
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
