import "../assets/styles/page-layout.css";

/**
 * Ranking page - displays leaderboard of top street art hunters
 * Shows users ranked by their discovery score
 */
function Classement() {
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <h1 className="page-title">Classement</h1>
        <p className="page-text">
          Découvrez le classement des chasseurs d'art urbain.
        </p>
      </div>
    </div>
  );
}

export default Classement;
