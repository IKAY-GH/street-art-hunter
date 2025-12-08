import "./accueil.css";
import StartButton from "../components/startButton";
import startImg from "../assets/images/Start-ButtonV2.png";

/**
 * Home page component with start button
 * Displays the main title and a start button that leads to game instructions
 */
function accueil() {
  return (
    <main className="accueil-container">
      <h1>STREET ART HUNTER</h1>
      <StartButton
        to="/instructions"
        src={startImg}
        alt="Bouton start menant aux instructions de jeu"
      />
    </main>
  );
}

export default accueil;
