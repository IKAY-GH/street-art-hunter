import { useNavigate } from "react-router";
import logo from "../assets/icon/logo-street-art-hunter.svg";

function BoutonAccueil() {
  const navigate = useNavigate();

  function handleclick() {
    navigate("/");
  }
  return (
    <div>
      <button onClick={handleclick} type="button">
        <img className="logo" src={logo} alt="logo" />
      </button>
    </div>
  );
}

export default BoutonAccueil;
