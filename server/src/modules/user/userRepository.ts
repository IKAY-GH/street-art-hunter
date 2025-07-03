import type { Result, Rows } from "../../../database/client";

import databaseClient from "../../../database/client";

type User = {
  id: number;
  email: string;
  created_at: Date;
  updated_at: Date;
  zip_code: string;
  last_name: string;
  first_name: string;
  password_hash: string;
  avatar_url: string;
};

class UserRepository {
  async create(user: Omit<User, "id">): Promise<Result> {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO artist (name, bio, profile_image_url, avatar_url) VALUES (?, ?, ?, ?)",
      [
        user.email,
        user.created_at,
        user.updated_at,
        user.zip_code,
        user.last_name,
        user.first_name,
        user.password_hash,
        user.avatar_url,
      ],
    );
    return result;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT* FROM artist WHERE id = ?",
      [id],
    );

    return rows[0] as User;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from artist");
    return rows as User[];
  }

  async update(user: User) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE artist SET bio = ?, profil_image_url = ?, created_at = ?, avatar_url = ? WHERE id = ?",
      [
        user.email,
        user.created_at,
        user.updated_at,
        user.zip_code,
        user.last_name,
        user.first_name,
        user.password_hash,
        user.avatar_url,
        user.id,
      ],
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

export default UserRepository;
