// Express app setup: middleware, routes, error handling.
const express = require("express");
const routes = require("./routes");

const app = express();

// Built-in middleware: JSON body parse karta hai
app.use(express.json());

// Saare API routes /api ke neeche
app.use("/api", routes);

// 404 handler: koi route match na ho to
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Basic error handler (Member 3 isko middleware/errorHandler.js mein shift karega)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

module.exports = app;
