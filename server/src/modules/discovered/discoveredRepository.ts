import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

// Discovered artwork entry type definition (junction table)
interface DiscoveredEntry {
  id?: number;
  user_id: number; // Foreign key to user table
  artwork_id: number; // Foreign key to artwork table
  photo_url: string; // Path to user's uploaded photo
  discovered_at?: Date; // Timestamp when artwork was discovered
}

/**
 * Repository for discovered artwork database operations
 * Manages user-artwork discoveries with photo uploads
 */
class DiscoveredRepository {
  // Insert a new discovery record into database
  async create(
    data: Omit<DiscoveredEntry, "id" | "discovered_at"> & {
      discovered_at?: Date | string;
    }
  ): Promise<Result> {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO discovered_artwork (user_id, artwork_id, photo_url, discovered_at) VALUES (?, ?, ?, ?)",
      [
        data.user_id,
        data.artwork_id,
        data.photo_url,
        data.discovered_at || new Date(),
      ]
    );
    return result;
  }

  // Fetch a single discovered entry by ID
  async read(id: number): Promise<DiscoveredEntry | undefined> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM discovered_artwork WHERE id = ?",
      [id]
    );
    return rows[0] as DiscoveredEntry | undefined;
  }

  // Fetch all discovered entries from database
  async readAll(): Promise<DiscoveredEntry[]> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM discovered_artwork"
    );
    return rows as DiscoveredEntry[];
  }

  // Update a discovered entry's data
  async update(data: DiscoveredEntry): Promise<Result> {
    const [result] = await databaseClient.query<Result>(
      "UPDATE discovered_artwork SET user_id = ?, artwork_id = ?, photo_url = ?, discovered_at = ? WHERE id = ?",
      [
        data.user_id,
        data.artwork_id,
        data.photo_url,
        data.discovered_at,
        data.id,
      ]
    );
    return result;
  }

  // Delete a discovered entry by ID
  async delete(id: number): Promise<Result> {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM discovered_artwork WHERE id = ?",
      [id]
    );
    return result;
  }
}

export default new DiscoveredRepository();
