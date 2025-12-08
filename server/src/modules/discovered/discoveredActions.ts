import path from "node:path";
import type { Request, Response } from "express";
import discoveredRepository from "../discovered/discoveredRepository";

// Controller to record a discovered artwork (with photo upload)
export const add = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, artworkId } = req.body;

    // Validate that file was uploaded
    if (!req.file) {
      res.status(400).json({ error: "Aucune image n'a été téléchargée." });
      return;
    }

    // Build relative path to uploaded photo
    const imagePath = path.join("uploads", req.file.filename);

    // Insert discovery record into database
    const result = await discoveredRepository.create({
      user_id: Number(userId),
      artwork_id: Number(artworkId),
      photo_url: imagePath,
      discovered_at: new Date(),
    });

    // Build response object with generated ID
    const newDiscoveredEntry = {
      id: result.insertId,
      user_id: Number(userId),
      artwork_id: Number(artworkId),
      photo_url: imagePath,
      discovered_at: new Date(),
    };

    res.status(201).json(newDiscoveredEntry);
  } catch (error) {
    console.error("Erreur lors de la création de discovered :", error);
    res.status(500).json({ error: "Erreur serveur lors de la création." });
  }
};

export default {
  add,
};
