import type { Result, Rows } from "../../../database/client";

import databaseClient from "../../../database/client";

type Artwork = {
  id: number;
  title: string;
  latitude: string;
  longitude: string;
  artist_id: string;
  points: number;
  created_at: string;
  updated_at: string;
};

class artworkRepository {
  async create(artwork: Omit<Artwork, "id">): Promise<Result> {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO artwork (title, latitude, longitude, artist_id, points, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        artwork.title,
        artwork.latitude,
        artwork.longitude,
        artwork.artist_id,
        artwork.points,
        artwork.created_at,
        artwork.updated_at,
      ],
    );
    return result;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT* FROM artist WHERE id = ?",
      [id],
    );

    return rows[0] as Artwork;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from artwork");
    return rows as Artwork[];
  }

  async update(artwork: Artwork) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE artwork SET title = ?, latitude = ?, longitude = ?, artist_id = ?, points = ?, created_at = ?, updated_at = ? WHERE id = ?",
      [
        artwork.title,
        artwork.latitude,
        artwork.longitude,
        artwork.artist_id,
        artwork.points,
        artwork.created_at,
        artwork.updated_at,
        artwork.id,
      ],
    );
    return result;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM artwork WHERE id = ?",
      [id],
    );
    return result;
  }
}

export default artworkRepository;
