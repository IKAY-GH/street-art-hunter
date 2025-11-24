import "../../assets/styles/page-layout.css";
import "../../assets/styles/footer-pages.css";
import "./equipe.css";

export default function Equipe() {
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <h1 className="page-title">Notre Équipe</h1>
        <div className="dev-cards">
          <div className="dev-card">
            <h3>Ridouane Zarzour</h3>
            <p>Développeur Full Stack</p>
            <a
              href="https://www.linkedin.com/in/ridouane-z-0452a2361"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>

          <div className="dev-card">
            <h3>Annick Cayuela </h3>
            <p>Développeuse Full Stack</p>
            <a
              href="https://www.linkedin.com/in/annick-cayuela-ikay"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>

          <div className="dev-card">
            <h3>Jerome Wiera</h3>
            <p>Développeur Full Stack</p>
            <a
              href="https://www.linkedin.com/in/jerome-wiera-4542a677"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>

          <div className="dev-card">
            <h3>Clément Bachimont</h3>
            <p>Développeur Full Stack</p>
            <a
              href="https://www.linkedin.com/in/cl%C3%A9ment-bachimont-53822b277"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
