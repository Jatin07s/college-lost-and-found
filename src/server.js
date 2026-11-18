/**
 * CampusFind - College Lost & Found Portal
 * Server Entrypoint (server.js)
 * Starts HTTP server and listens on configured port
 */

const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("==================================================");
  console.log(` CampusFind server is running successfully!`);
  console.log(` URL: http://localhost:${PORT}`);
  console.log("==================================================");
});

// Graceful shutdown handling
process.on("SIGINT", () => {
  console.log("\nShutting down CampusFind server gracefully...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
