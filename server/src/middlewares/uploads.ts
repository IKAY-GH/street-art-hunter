import fs from "node:fs";
import path from "node:path";
import multer from "multer";

// Définir le chemin du dossier uploads
const uploadDir = path.join(__dirname, "../../uploads");

if (!fs.existsSync(uploadDir)) {
  // Créer le dossier s’il n’existe pas
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuration du stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

export const upload = multer({ storage });
