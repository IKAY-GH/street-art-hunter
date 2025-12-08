import type { Request, Response } from "express";
import artworkRepository from "./artworkRepository";

// Controller to retrieve all artworks
const browse = async (req: Request, res: Response): Promise<void> => {
  try {
    const artworks = await artworkRepository.findAll();
    res.status(200).json(artworks);
  } catch (error) {
    console.error("Erreur lors de la récupération des œuvres :", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

// Controller to retrieve a single artwork by ID
const read = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const artwork = await artworkRepository.findById(id);

    if (!artwork) {
      res.status(404).json({ error: "Œuvre non trouvée." });
      return;
    }

    res.status(200).json(artwork);
  } catch (error) {
    console.error("Erreur lors de la lecture de l’œuvre :", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

// Controller to create a new artwork
const add = async (req: Request, res: Response): Promise<void> => {
  try {
    const newArtwork = req.body;
    const createdArtwork = await artworkRepository.create(newArtwork);
    res.status(201).json(createdArtwork);
  } catch (error) {
    console.error("Erreur lors de la création de l’œuvre :", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

export default {
  browse,
  read,
  add,
};
