function home() {
  function handleclick() {
    console.log(" click ! ");
  }
  return (
    <div className="container">
      <h1>STREET ART HUNTER</h1>
      <button className="btn-start" onClick={handleclick} type="button">
        START
      </button>
    </div>
  );
}

export default home;
