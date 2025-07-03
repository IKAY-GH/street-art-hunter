import type { RequestHandler } from "express";
import scoreRepository from "./scoreRepository";

const repository = new scoreRepository();

const browse: RequestHandler = async (req, res, next) => {
  try {
    const score = await repository.readAll();
    res.json(score);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const scoreId = Number(req.params.id);
    const score = await repository.read(scoreId);
    if (score == null) {
      res.sendStatus(404);
    } else {
      res.json(score);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newscore = {
      user_Id: req.body.user_Id,
      total_points: req.body.total_points,
      updated_at: req.body.updated_at,
    };
    const insertId = await repository.create(newscore);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add };
