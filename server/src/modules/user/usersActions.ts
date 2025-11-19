import argon2 from "argon2";
import type { RequestHandler } from "express";

// Import access to data
import usersRepository from "./usersRepository";
import { generateToken } from "../../utils/jwt";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const users = await usersRepository.readAll();

    // Respond with the items in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const usersId = Number(req.params.id);
    const Users = await usersRepository.read(usersId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (Users == null) {
      res.sendStatus(404);
    } else {
      res.json(Users);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    // 1. Chercher l'utilisateur par email
    const user = await usersRepository.readByEmailWithPassword(req.body.email);

    // 2. Si l'utilisateur n'existe pas
    if (user == null) {
      res.status(401).json({ message: "Email ou mot de passe incorrect" });
      return;
    }

    // 3. Vérifier le mot de passe avec argon2
    const verified = await argon2.verify(user.password_hash, req.body.password);

    // 4. Si le mot de passe est incorrect
    if (!verified) {
      res.status(401).json({ message: "Email ou mot de passe incorrect" });
      return;
    }

    // 5. Générer le token JWT avec le rôle
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.is_admin ? "admin" : "user",
    });

    // 6. Retourner le token et les infos user (sans le password)
    const { password_hash, ...userWithoutPassword } = user;
    res.json({
      token,
      user: {
        ...userWithoutPassword,
        role: user.is_admin ? "admin" : "user",
      },
    });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
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

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const newUsers = {
      email: req.body.email,
      avatar_url: req.body.avatar_url,
      zip_code: req.body.zip_code,
      last_name: req.body.last_name,
      first_name: req.body.first_name,
      password_hash: req.body.password_hash,
      pseudo: req.body.pseudo,
      is_admin: req.body.is_admin ?? false,
    };

    // Create the user in database
    const insertId = await usersRepository.create(newUsers);

    // Générer le token JWT pour connexion automatique après inscription
    const token = generateToken({
      userId: insertId,
      email: newUsers.email,
      role: newUsers.is_admin ? "admin" : "user",
    });

    // Respond with HTTP 201 (Created), le token et les infos user
    res.status(201).json({
      token,
      user: {
        id: insertId,
        email: newUsers.email,
        pseudo: newUsers.pseudo,
        role: newUsers.is_admin ? "admin" : "user",
      },
    });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, add, hashPassword, login };
