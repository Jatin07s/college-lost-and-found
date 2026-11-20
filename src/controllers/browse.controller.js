/**
 * Member 3 (Yash Prasad) - Browse & Search Controller (browse.controller.js)
 * Handles browsing reports, search/category filtering, and single item details
 */

const { getAllReports, getReportById } = require("../data/reports");

// GET /browse - Display all reports with optional search/type filter
exports.browseReports = (req, res) => {
  const { search, type, category } = req.query;
  let reports = getAllReports();

  // Filter by search query (title or description)
  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    reports = reports.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q))
    );
  }

  // Filter by type (LOST or FOUND)
  if (type && type !== "ALL") {
    reports = reports.filter((item) => item.type.toUpperCase() === type.toUpperCase());
  }

  // Filter by category
  if (category && category !== "ALL") {
    reports = reports.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  }

  res.render("browse", {
    activePage: "browse",
    reports,
    query: req.query,
  });
};

// GET /reports/:id - Show full details for one report
exports.getReportDetails = (req, res) => {
  const { id } = req.params;
  const report = getReportById(id);

  if (!report) {
    return res.status(404).render("browse", {
      activePage: "browse",
      reports: getAllReports(),
      query: {},
      errorMessage: `Report #${id} was not found.`,
    });
  }

  res.render("details", {
    activePage: "browse",
    report,
  });
};
