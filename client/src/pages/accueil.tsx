import "./accueil.css";

function accueil() {
  function handleClick() {}
  return (
    <main className="accueil-container">
      <h1>STREET ART HUNTER</h1>
      <button className="btn-start" onClick={handleClick} type="button">
        START
      </button>
    </main>
  );
}

export default accueil;
