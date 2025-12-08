import "dotenv/config";

// Check database connection on startup
import "../database/checkConnection";

import app from "./app";

// Get port from environment variables
const port = process.env.APP_PORT;

// Start Express server
app
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err: Error) => {
    console.error("Error:", err.message);
  });
