function home() {
  function handleclick() {
    console.log(" click ! ");
  }
  return (
    <div>
      <h1>STREET ART HUNTER</h1>
      <button className="btn" onClick={handleclick} type="button">
        START
      </button>
    </div>
  );
}

export default home;
