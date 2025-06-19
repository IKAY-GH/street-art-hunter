import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {year} Street Art Hunter – Tous droits réservés</p>
      <div className="links">
        <a href="/mentions-legales">Mentions légales</a>
        <a href="/cgu">CGU</a>
        <a
          href="https://www.linkedin.com/in/ridouane-z-0452a2361/" // mettre votre url linkedin
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}

export default Footer;
