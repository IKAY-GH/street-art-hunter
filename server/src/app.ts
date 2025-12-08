import fs from "node:fs";
import path from "node:path";
import cors from "cors";
import express from "express";

// Initialize Express application
const app = express();

// Configure CORS to allow requests from frontend
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Parse JSON request bodies
app.use(express.json());

// Serve static files from public folder
const publicFolderPath = path.join(__dirname, "../../server/public");

if (fs.existsSync(publicFolderPath)) {
  app.use(express.static(publicFolderPath));
}

// Mount main API router
import router from "./router";
app.use(router);

// Mount discovered artworks router
import discoveredRouter from "./modules/discovered/discoveredRouter";
app.use("/api/discovered", discoveredRouter);

// Serve uploaded files (photos)
const uploadsPath = path.join(__dirname, "../../uploads");
if (fs.existsSync(uploadsPath)) {
  app.use("/uploads", express.static(uploadsPath));
}

// Serve React app in production (SPA fallback)
const clientBuildPath = path.join(__dirname, "../../client/dist");

if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));

  app.get("*", (_, res) => {
    res.sendFile("index.html", { root: clientBuildPath });
  });
}

import type { ErrorRequestHandler } from "express";

// Middleware to log errors with request details
const logErrors: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  console.error("on req:", req.method, req.path);
  next(err);
};

app.use(logErrors);

export default app;
