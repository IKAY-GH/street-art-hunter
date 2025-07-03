import type { RequestHandler } from "express";
import userRepository from "./userRepository";

const repository = new userRepository();

const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await repository.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const user = await repository.read(userId);
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const user = {
      email: req.body.email,
      created_at: req.body.created_at,
      updated_at: req.body.updated_at,
      last_name: req.body.last_name,
      first_name: req.body.first_name,
      zip_code: req.body.zip_code,
      password_hash: req.body.password_hash,
      avatar_url: req.body.avatar_url,
    };
    const insertId = await repository.create(user);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add };
