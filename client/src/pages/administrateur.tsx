import "./administrateur.css";
import "../assets/styles/global.css";
import Tabs from "../components/Tabs";

export default function administrateur() {
  return (
    <main className="administrator-container">
      <h2>Administrateur</h2>
      <div>
        <Tabs />
      </div>
    </main>
  );
}
