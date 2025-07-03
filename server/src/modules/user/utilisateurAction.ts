import type { RequestHandler } from "express";
import utilisateurRepository from "./utilisateurRepository";

// Browse: récupérer tous les utilisateurs
const browse: RequestHandler = async (req, res, next) => {
  try {
    const utilisateurs = await utilisateurRepository.readAll();
    res.json(utilisateurs);
  } catch (err: unknown) {
    next(err);
  }
};

// Read: récupérer un utilisateur par ID
const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const utilisateur = await utilisateurRepository.read(userId);

    if (!utilisateur) {
      res.sendStatus(404);
    } else {
      res.json(utilisateur);
    }
  } catch (err: unknown) {
    next(err);
  }
};

// Add: ajouter un nouvel utilisateur
const add: RequestHandler = async (req, res, next) => {
  try {
    const { pseudo, nom, prenom, email, age, ville, mot_de_passe } = req.body;

    // Validation simple
    if (
      !pseudo ||
      !nom ||
      !prenom ||
      !email ||
      age === undefined ||
      age === null ||
      !ville ||
      !mot_de_passe
    ) {
      res.status(400).json({ error: "Tous les champs sont obligatoires." });
      return;
    }

    const now = new Date();

    const newUtilisateur = {
      pseudo,
      nom,
      prenom,
      email,
      age: Number(age),
      ville,
      mot_de_passe,
      created_at: now,
      updated_at: now,
    };

    const insertId = await utilisateurRepository.create(newUtilisateur);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
    return;
  } catch (err: unknown) {
    // Pass any errors to the error-handling middleware
    next(err);
    return;
  }
};

export default { browse, read, add };
