/**
 * CampusFind - College Lost & Found Portal
 * Application Configuration (app.js)
 * Configures Express, EJS views, static assets, and modular routes
 */

const path = require("path");
const express = require("express");

const { getRecentReports } = require("./data/reports");

// Import Member Feature Routes
const lostRoutes = require("./routes/lost.routes");
const foundRoutes = require("./routes/found.routes");
const browseRoutes = require("./routes/browse.routes");
const matchRoutes = require("./routes/match.routes");

const app = express();

// ---------------------------------------------------------------------------
// 1. Template Engine & Views Setup (EJS)
// ---------------------------------------------------------------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

// ---------------------------------------------------------------------------
// 2. Middleware Configuration
// ---------------------------------------------------------------------------
// Parse incoming form submissions (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Parse JSON request payloads
app.use(express.json());

// Serve static assets (CSS, client JS, images) from public directory
app.use(express.static(path.join(__dirname, "..", "public")));

// ---------------------------------------------------------------------------
// 3. Application Routes
// ---------------------------------------------------------------------------
// Home Page
app.get("/", (req, res) => {
  const recentReports = getRecentReports(4);
  res.render("home", {
    activePage: "home",
    recentReports,
  });
});

// Member 1: Lost Item Feature
app.use("/lost", lostRoutes);

// Member 2: Found Item Feature
app.use("/found", foundRoutes);

// Member 3: Browse & Details Feature
app.use("/", browseRoutes);

// Member 4: Smart Matching Feature
app.use("/matches", matchRoutes);

// ---------------------------------------------------------------------------
// 4. 404 Not Found & Error Handling Middleware
// ---------------------------------------------------------------------------
app.use((req, res) => {
  res.status(404).render("home", {
    activePage: "home",
    recentReports: getRecentReports(4),
  });
});

app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err.stack);
  res.status(500).send("Something went wrong on CampusFind. Please try again.");
});

module.exports = app;
