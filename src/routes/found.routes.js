/**
 * Member 2 - Found Item Routes (found.routes.js)
 * Defines endpoints for reporting items found on campus
 */

const express = require("express");
const router = express.Router();
const foundController = require("../controllers/found.controller");

// Route to display found item form
router.get("/", foundController.showFoundForm);

// Route to process found form submission
router.post("/", foundController.submitFoundForm);

module.exports = router;
