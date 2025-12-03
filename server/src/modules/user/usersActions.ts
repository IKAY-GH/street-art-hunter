import argon2 from "argon2";
import type { RequestHandler } from "express";
import { generateToken } from "../../utils/jwt";

import usersRepository from "./usersRepository";
import type { User } from "./usersRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await usersRepository.readAll();

    res.json(users);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const usersId = Number(req.params.id);
    const Users = await usersRepository.read(usersId);
    if (Users == null) {
      res.sendStatus(404);
    } else {
      res.json(Users);
    }
  } catch (err) {
    next(err);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const user = await usersRepository.readByEmailWithPassword(req.body.email);

    if (user == null) {
      res.status(401).json({ message: "Email ou mot de passe incorrect" });
      return;
    }

    const verified = await argon2.verify(user.password_hash, req.body.password);

    if (!verified) {
      res.status(422).json({ message: "Email ou mot de passe incorrect" });
      return;
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        pseudo: user.pseudo,
        role: user.is_admin ? "admin" : "user",
      },
    });
  } catch (err) {
    next(err);
  }
};

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;

    const hashedPassword = await argon2.hash(password, hashingOptions);

    req.body.password_hash = hashedPassword;

    req.body.password = undefined;

    next();
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
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

    const insertId = await usersRepository.create(newUsers);

    const token = generateToken({
      id: insertId,
      email: newUsers.email,
      is_admin: newUsers.is_admin,
    });

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
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);

    const existingUser = await usersRepository.read(userId);

    if (!existingUser || existingUser.length === 0) {
      res.sendStatus(404);
      return;
    }

    const user = existingUser[0];

    if (req.user?.id !== userId && req.user?.role !== "admin") {
      res.status(403).json({ message: "Non autorisé" });
      return;
    }

    const updatedUser: User = {
      ...user,
      email: req.body.email ?? user.email,
      avatar_url: req.body.avatar_url ?? user.avatar_url,
      zip_code: req.body.zip_code ?? user.zip_code,
      first_name: req.body.first_name ?? user.first_name,
      last_name: req.body.last_name ?? user.last_name,
      pseudo: req.body.pseudo ?? user.pseudo,
      password_hash: user.password_hash,
      is_admin: user.is_admin, //
    };

    await usersRepository.update(updatedUser, userId);

    const updated = await usersRepository.read(userId);

    res.json(updated[0]);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, hashPassword, login, edit };
