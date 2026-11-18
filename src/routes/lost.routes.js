/**
 * Member 1 - Lost Item Routes (lost.routes.js)
 * Defines endpoints for reporting lost belongings
 */

const express = require("express");
const router = express.Router();
const lostController = require("../controllers/lost.controller");

// Route to display lost item form
router.get("/", lostController.showLostForm);

// Route to process form submission
router.post("/", lostController.submitLostForm);

module.exports = router;
