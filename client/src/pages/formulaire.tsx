import type React from "react";
import "./formulaire.css";

function Formulaire() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    const pseudo = formData.get("pseudo")?.toString() || "";
    const email = formData.get("email")?.toString() || "";

    form.reset();

    alert(`Bienvenue ${pseudo} ! Votre email : ${email}`);
  };

  return (
    <div className="profil">
      <h2>Inscription</h2>

      <div className="ligne-separation" />

      <form onSubmit={handleSubmit}>
        <label htmlFor="pseudo">pseudo</label>
        <input name="pseudo" type="text" id="pseudo" required />

        <label htmlFor="nom">nom</label>
        <input name="nom" type="text" id="nom" required />

        <label htmlFor="prenom">prenom</label>
        <input name="prenom" type="text" id="prenom" required />

        <label htmlFor="email">email</label>
        <input name="email" type="email" id="email" required />

        <label htmlFor="password">mot de passe</label>
        <input name="password" type="password" id="password" required />

        <div>
          <button id="btn-valide" type="submit">
            Inscription
          </button>
        </div>
      </form>
    </div>
  );
}

export default Formulaire;
