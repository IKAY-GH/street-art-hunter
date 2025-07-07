import type { RequestHandler } from "express";
import userRepository from "./userRepository";

// Browse: récupérer tous les utilisateurs

const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await userRepository.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};
// Read: récupérer un utilisateur par ID
const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const user = await userRepository.read(userId);
    if (!user) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err: unknown) {
    next(err);
  }
};
// Add: ajouter un nouvel utilisateur
const add: RequestHandler = async (req, res, next) => {
  try {
    const {
      pseudo,
      first_name,
      last_name,
      email,
      password_hash,
      zip_code,
      avatar_url,
    } = req.body;

    if (
      !pseudo ||
      !first_name ||
      !last_name ||
      !email ||
      !password_hash ||
      !zip_code ||
      !avatar_url
    ) {
      res.status(400).json({ error: "Tous les champs sont obligatoires." });
      return;
    }

    const now = new Date();

    const newUser = {
      pseudo,
      last_name,
      first_name,
      email,
      password_hash,
      zip_code,
      avatar_url,
    };

    const { insertId } = await userRepository.create(newUser);
    res.status(201).json({ insertId });
    return;
  } catch (err: unknown) {
    next(err);
    return;
  }
};

export default { browse, read, add };
