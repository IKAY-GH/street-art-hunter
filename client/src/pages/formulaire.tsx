import type React from "react";

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

        <div>
        <input name="pseudo" type="text" id="pseudo" required />
        <label htmlFor="pseudo">pseudo</label>
        </div>
        <div>
        <input name="nom" type="text" id="nom" required />
        <label htmlFor="nom">nom</label>
        </div>
        <div>
        <input name="prenom" type="text" id="prenom" required />
        <label htmlFor="prenom">prenom</label>
        </div>
        <div>
        <label htmlFor="email">email</label>
        <input name="email" type="email" id="email" required />
        </div>
        <div>
        <button id="btn-valide" type="submit">Inscription</button>
        </div>
      </form>
    </div>
  );
}

export default Formulaire;
