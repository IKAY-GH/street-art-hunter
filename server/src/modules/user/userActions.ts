import argon2 from "argon2";
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

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    // Extraction du mot de passe de la requête
    const { password } = req.body;

    // Hachage du mot de passe avec les options spécifiées
    const hashedPassword = await argon2.hash(password, hashingOptions);

    // Remplacement du mot de passe non haché par le mot de passe haché dans la requête
    req.body.password_hash = hashedPassword;

    // Oubli du mot de passe non haché de la requête : il restera un secret même pour notre code dans les autres actions
    req.body.password = undefined;

    next();
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, hashPassword };
