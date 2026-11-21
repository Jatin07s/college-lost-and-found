




// M4 - Omm Prakash

const express = require("express");
const router = express.Router();
const matchController = require("../controllers/match.controller");

// Route to compute and show possible matches for a report
router.get("/:id", matchController.getMatchesForReport);

module.exports = router;
