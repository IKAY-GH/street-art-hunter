import { Link } from "react-router";

function BoutonDesktop() {
  return (
    <nav>
      <Link to={"/connexion"}>
        <button className="connexion" type="button">connexion</button>
      </Link>
    </nav>
  );
}

export default BoutonDesktop;
