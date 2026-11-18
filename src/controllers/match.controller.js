/**
 * Member 4 - Smart Matching Controller (match.controller.js)
 * Compares reports and suggests possible matches using rule-based scoring
 */

const { getReportById, getAllReports } = require("../data/reports");
const { findMatches } = require("../services/match.service");

// GET /matches/:id - Suggest likely matches for an item
exports.getMatchesForReport = (req, res) => {
  const { id } = req.params;
  const report = getReportById(id);

  if (!report) {
    return res.status(404).render("browse", {
      activePage: "browse",
      reports: getAllReports(),
      query: {},
      errorMessage: `Report #${id} does not exist.`,
    });
  }

  // Load all reports and calculate matching scores against opposite type
  const allReports = getAllReports();
  const matches = findMatches(report, allReports, 60);

  res.render("matches", {
    activePage: "browse",
    report,
    matches,
  });
};
