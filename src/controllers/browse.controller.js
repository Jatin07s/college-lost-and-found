/**
 * Member 3 - Browse & Search Controller (browse.controller.js)
 * Handles browsing reports, search/category filtering, and single item details via Prisma ORM
 */

const prisma = require("../db");

// GET /browse - Display all reports with optional search/type filter
exports.browseReports = async (req, res, next) => {
  try {
    const { search, type, category } = req.query;

    const where = {};

    // Filter by report type (LOST or FOUND)
    if (type && type !== "ALL") {
      where.type = type.toUpperCase();
    }

    // Filter by category
    if (category && category !== "ALL") {
      where.category = category;
    }

    // Filter by search query (title or description)
    if (search && search.trim()) {
      where.OR = [
        { title: { contains: search.trim() } },
        { description: { contains: search.trim() } },
      ];
    }

    const reports = await prisma.report.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    res.render("browse", {
      activePage: "browse",
      reports,
      query: req.query,
    });
  } catch (error) {
    console.error("Error loading browse reports:", error);
    next(error);
  }
};

// GET /reports/:id - Show full details for one report
exports.getReportDetails = async (req, res, next) => {
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
        errorMessage: `Report #${req.params.id} was not found.`,
      });
    }

    res.render("details", {
      activePage: "browse",
      report,
    });
  } catch (error) {
    console.error("Error loading report details:", error);
    next(error);
  }
};
