import type { Result, Rows } from "../../../database/client";

import databaseClient from "../../../database/client";

type Artist = {
  id: number;
  name: string;
  bio: string;
  profile_image_url: string;
  avatar_url: string;
};

class artistRepository {
  async create(artist: Omit<Artist, "id">): Promise<Result> {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO artist (name, bio, profile_image_url, avatar_url) VALUES (?, ?, ?, ?)",
      [artist.name, artist.bio, artist.profile_image_url, artist.avatar_url],
    );
    return result;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT* FROM artist WHERE id = ?",
      [id],
    );

    return rows[0] as Artist;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from artist");
    return rows as Artist[];
  }

  async update(artist: Artist) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE artist SET bio = ?, profil_image_url = ?, created_at = ?, avatar_url = ? WHERE id = ?",
      [artist.bio, artist.profile_image_url, artist.avatar_url, artist.id],
    );
    return result;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM artist WHERE id = ?",
      [id],
    );
    return result;
  }
}

export default artistRepository;
