/**
 * Member 4 - Smart Matching Controller (match.controller.js)
 * Compares reports and suggests possible matches using rule-based scoring and Prisma ORM
 */

const prisma = require("../db");
const { findMatches } = require("../services/match.service");

// GET /matches/:id - Suggest likely matches for an item
exports.getMatchesForReport = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).redirect("/browse");
    }

    const report = await prisma.report.findUnique({
      where: { id },
    });

    if (!report) {
      const allReports = await prisma.report.findMany({ orderBy: { createdAt: "desc" } });
      return res.status(404).render("browse", {
        activePage: "browse",
        reports: allReports,
        query: {},
        errorMessage: `Report #${req.params.id} does not exist.`,
      });
    }

    // Load candidates of the opposite type that are still OPEN
    const oppositeType = report.type === "LOST" ? "FOUND" : "LOST";
    const candidateReports = await prisma.report.findMany({
      where: {
        type: oppositeType,
        status: "OPEN",
      },
    });

    // Run scoring algorithm
    const matches = findMatches(report, candidateReports, 60);

    res.render("matches", {
      activePage: "browse",
      report,
      matches,
    });
  } catch (error) {
    console.error("Error calculating matches:", error);
    next(error);
  }
};
