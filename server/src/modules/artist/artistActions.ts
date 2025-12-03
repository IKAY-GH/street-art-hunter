import type { RequestHandler } from "express";

import artistRepository from "./artistRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const artists = await artistRepository.readAll();

    res.json(artists);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const artistId = Number(req.params.id);
    const artist = await artistRepository.read(artistId);

    if (artist == null) {
      res.sendStatus(404);
    } else {
      res.json(artist);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newArtist = {
      name: req.body.name,
      bio: req.body.bio,
      profile_image_url: req.body.profile_image_url,
      created_at: req.body.created_at,
    };

    const insertId = await artistRepository.create(newArtist);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const deleteArtist: RequestHandler = async (req, res, next) => {
  try {
    const artistId = Number(req.params.id);
    const artist = await artistRepository.delete(artistId);
    if (artist !== null) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, deleteArtist };
