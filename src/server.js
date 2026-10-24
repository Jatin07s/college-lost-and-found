// Entry point: HTTP module se server banta hai, Express app uske upar chalta hai.
const http = require("http");
const { port } = require("./config/env");
const prisma = require("./config/db");
const app = require("./app");

// HTTP module: Express app ko http.createServer ko diya
const server = http.createServer(app);

async function start() {
  try {
    await prisma.$connect();
    console.log("Database connected");

    server.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

// Process module: Ctrl+C par server aur DB cleanly band karna
process.on("SIGINT", async () => {
  console.log("\nShutting down...");
  server.close();
  await prisma.$disconnect();
  process.exit(0);
});

start();
