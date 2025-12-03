import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Artist = {
  id: number;
  name: string;
  bio: string;
  profile_image_url: string;
  created_at: Date;
};

class ArtistRepository {
  async create(artist: Omit<Artist, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT into artist ( name, bio, profile_image_url) values ( ?, ?, ?)",
      [artist.name, artist.bio, artist.profile_image_url]
    );

    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM artist WHERE id = ?",
      [id]
    );

    return (rows as Artist[])[0] ?? null;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM artist");

    return rows as Artist[];
  }

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

  async delete(id: number) {
    await databaseClient.query("DELETE FROM artist WHERE id = ?", [id]);
  }
}

export default new ArtistRepository();
