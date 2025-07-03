import type { RequestHandler } from "express";
import artistRepository from "./artistRepository";

const repository = new artistRepository();

const browse: RequestHandler = async (req, res, next) => {
  try {
    // const artists = await repository.readAll();
    const response = await fetch(
      "https://streetartcities.com/api/frontend/sitemap/cities/toulouse/index.xml",
    );
    const artists = await response.json();
    res.json(artists);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const artistId = Number(req.params.id);
    const artist = await repository.read(artistId);
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
      bio: req.body.bio,
      name: req.body.name,
      profile_image_url: req.body.profil_image_url,
      avatar_url: req.body.avatar_url,
    };
    const insertId = await repository.create(newArtist);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add };
