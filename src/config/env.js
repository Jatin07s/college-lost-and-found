// Environment config: .env file load karta hai aur required variables check karta hai.
const path = require("path");
const dotenv = require("dotenv");

// Path module: project root ke .env ka path banaya
dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

const required = ["DATABASE_URL", "JWT_SECRET"];
const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(`Missing environment variables: ${missing.join(", ")}`);
  console.error("Copy .env.example to .env and fill the values.");
  // Process module: abnormal termination ke liye exit code 1
  process.exit(1);
}

module.exports = {
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
  nodeEnv: process.env.NODE_ENV || "development",
};
