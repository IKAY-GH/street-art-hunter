import "../assets/styles/page-layout.css";

export default function MentionsLegales() {
  return (
    <div className="page-wrapper-with-bg">
      <div className="page-content legal-container">
        <h1 className="page-title">Mentions légales</h1>

        <section className="page-section">
          <h2>Éditeur du site</h2>
          <p className="page-text">
            Le site <strong>Street Art Hunter</strong> est édité par une équipe
            indépendante de passionné·es d'art urbain.
          </p>
          <p className="page-text">
            Email :{" "}
            <a href="mailto:contact@streetarthunter.com">
              contact@streetarthunter.com
            </a>
          </p>
        </section>

        <section className="page-section">
          <h2>Hébergement</h2>
          <p className="page-text">
            Le site est hébergé par :
            <br />
            <strong>On ne sait pas encore</strong>
            <br />
            rue des dev en formtions tarte au citron
            <br />
            Site web :{" "}
            <a
              href="https://www.infomaniak.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              infomaniak.com
            </a>
          </p>
        </section>

        <section className="page-section">
          <h2>Propriété intellectuelle</h2>
          <p className="page-text">
            L'ensemble des contenus présents sur le site (textes, images,
            cartes, vidéos, etc.) sont protégés par le droit d'auteur. Sauf
            mention contraire, ils sont la propriété exclusive de Street Art
            Hunter.
          </p>
        </section>

        <section className="page-section">
          <h2>Crédits</h2>
          <p className="page-text">
            Certaines œuvres photographiées ou cartographiées sur ce site
            restent la propriété de leurs auteur·es respectif·ves. En cas de
            demande de retrait, merci de nous contacter.
          </p>
        </section>

        <section className="page-section">
          <h2>Cookies</h2>
          <p className="page-text">
            Ce site n'utilise pas de cookies à des fins publicitaires. Des
            cookies techniques peuvent être utilisés pour améliorer l'expérience
            utilisateur.
          </p>
        </section>
      </div>
    </div>
  );
}
