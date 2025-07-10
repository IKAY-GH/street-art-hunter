import { Link } from "react-router";

function BoutonDesktop() {
  return (
    <nav>
      <Link to={"/connexion"}>connexion</Link>
    </nav>
  );
}

export default BoutonDesktop;
