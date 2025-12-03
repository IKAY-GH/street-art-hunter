import type { ResultSetHeader, RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";

type Artwork = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  artist_id: number;
};

const findAll = async (): Promise<Artwork[]> => {
  const [rows] = await databaseClient.query<Artwork[] & RowDataPacket[]>(
    "SELECT * FROM artwork"
  );
  return rows;
};

const findById = async (id: number): Promise<Artwork | null> => {
  const [rows] = await databaseClient.query<Artwork[] & RowDataPacket[]>(
    "SELECT * FROM artwork WHERE id = ?",
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
};

const create = async (
  artwork: Omit<Artwork, "id">
): Promise<ResultSetHeader> => {
  const [result] = await databaseClient.query<ResultSetHeader>(
    "INSERT INTO artwork (title, description, imageUrl, artist_id) VALUES (?, ?, ?, ?)",
    [artwork.title, artwork.description, artwork.imageUrl, artwork.artist_id]
  );
  return result;
};

export default {
  findAll,
  findById,
  create,
};
