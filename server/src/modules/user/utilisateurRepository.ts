import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Utilisateur = {
  id: number;
  pseudo: string;
  nom: string;
  prenom: string;
  email: string;
  age: number;
  ville: string;
  mot_de_passe: string;
  created_at: Date;
  updated_at: Date;
};

class utilisateurRepository {
  // The C of CRUD - Create operation

  async create(user: Omit<Utilisateur, "id">) {
    // Execute the SQL INSERT query to add a new utilisateur to the "utilisateur" table
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO utilisateur (pseudo, nom, prenom, email, age, ville, mot_de_passe, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        user.pseudo,
        user.nom,
        user.prenom,
        user.email,
        user.age,
        user.ville,
        user.mot_de_passe,
        user.created_at,
        user.updated_at,
      ],
    );

    // Return the ID of the newly inserted utilisateur
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific utilisateur by its ID
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM utilisateur WHERE id = ?",
      [id],
    );

    // Return the first row of the result, which represents the utilisateur
    return rows[0] as Utilisateur;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all utilisateurs from the "utilisateur" table
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM utilisateur");

    // Return the array of utilisateurs
    return rows as Utilisateur[];
  }

  // The U of CRUD - Update operation

  async update(
    id: number,
    utilisateur: Partial<Omit<Utilisateur, "id" | "created_at" | "updated_at">>,
  ) {
    await databaseClient.query(
      `UPDATE utilisateur SET
        pseudo = ?,
        nom = ?,
        prenom = ?,
        email = ?,
        age = ?,
        ville = ?,
        mot_de_passe = ?,
        updated_at = NOW()
      WHERE id = ?`,
      [
        utilisateur.pseudo ?? null,
        utilisateur.nom ?? null,
        utilisateur.prenom ?? null,
        utilisateur.email ?? null,
        utilisateur.age ?? null,
        utilisateur.ville ?? null,
        utilisateur.mot_de_passe ?? null,
        id,
      ]
    );
  }
  // TODO: Implement the update operation to modify an existing item

  // async update(item: Item) {
  //   ...
  // }

  // The D of CRUD - Delete operation

  async delete(id: number) {
    await databaseClient.query("DELETE FROM artwork WHERE id = ?", [id]);
    await databaseClient.query("DELETE FROM utilisateur WHERE id = ?", [id]);

  // TODO: Implement the delete operation to remove an item by its ID

  // async delete(id: number) {
  //   ...
  // }
}
}

export default new utilisateurRepository();