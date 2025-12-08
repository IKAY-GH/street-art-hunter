import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

// Artist entity type definition
type Artist = {
  id: number;
  name: string;
  bio: string; // Artist biography/description
  profile_image_url: string; // URL to artist's profile photo
  created_at: Date;
};

/**
 * Repository for artist database operations
 * Handles CRUD operations for street artists
 */
class ArtistRepository {
  // Insert a new artist into database and return the generated ID
  async create(artist: Omit<Artist, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT into artist ( name, bio, profile_image_url) values ( ?, ?, ?)",
      [artist.name, artist.bio, artist.profile_image_url]
    );

    return result.insertId;
  }

  // Fetch a single artist by ID, returns null if not found
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM artist WHERE id = ?",
      [id]
    );

    return (rows as Artist[])[0] ?? null;
  }

  // Fetch all artists from database
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM artist");

    return rows as Artist[];
  }

  // Update artist data (automatically sets created_at to current time)
  async update(artist: Artist, id: number) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE artist SET name = ?, bio = ?, profile_image_url = ?, created_at = NOW() WHERE id = ?",
      [
        artist.name ?? null,
        artist.bio ?? null,
        artist.profile_image_url ?? null,
      ]
    );

    return result;
  }

  // Delete artist by ID
  async delete(id: number) {
    await databaseClient.query("DELETE FROM artist WHERE id = ?", [id]);
  }
}

export default new ArtistRepository();
