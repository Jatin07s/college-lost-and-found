/**
 * Member 3 (Yash Prasad)- Browse & Search Routes (browse.routes.js)
 * Defines endpoints for browsing report cards and viewing details
 */

const express = require("express");
const router = express.Router();
const browseController = require("../controllers/browse.controller");

// Browse all reports with optional filters
router.get("/browse", browseController.browseReports);

// View details of one report
router.get("/reports/:id", browseController.getReportDetails);

module.exports = router;
