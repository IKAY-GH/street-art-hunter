import fs from "node:fs";
import path from "node:path";
import multer from "multer";

/**
 * Multer middleware configuration for file uploads
 * Handles photo uploads for discovered artworks
 */

// Define upload directory path
const uploadDir = path.join(__dirname, "../../public/uploads");

// Create upload directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer disk storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  // Generate unique filename with timestamp and random suffix
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `photo-${uniqueSuffix}${ext}`);
  },
});

// Export configured multer instance
export const upload = multer({ storage });
