import type { RequestHandler } from "express";
import artworkRepository from "./artworkRepository";

const repository = new artworkRepository();

const browse: RequestHandler = async (req, res, next) => {
  try {
    const artworks = await repository.readAll();
    res.json(artworks);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const artworkId = Number(req.params.id);
    const artwork = await repository.read(artworkId);
    if (artwork == null) {
      res.sendStatus(404);
    } else {
      res.json(artwork);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newArtwork = {
      id: req.body.id,
      title: req.body.title,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      artist_id: req.body.artist_id,
      points: req.body.points,
      created_at: req.body.created_at,
      updated_at: req.body.updated_at,
    };
    const insertId = await repository.create(newArtwork);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add };
