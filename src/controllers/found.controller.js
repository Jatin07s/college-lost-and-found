/**
 * Member 2 - Found Item Controller (found.controller.js)
 * Handles rendering the Found Item form and saving found reports
 */

const { addReport } = require("../data/reports");

// GET /found - Show found item form
exports.showFoundForm = (req, res) => {
  res.render("found", {
    activePage: "found",
    successMessage: null,
    errorMessage: null,
  });
};

// POST /found - Save found item report
exports.submitFoundForm = (req, res) => {
  const { title, category, color, location, itemDate, description } = req.body;

  // Basic validation
  if (!title || !category || !color || !location || !itemDate) {
    return res.render("found", {
      activePage: "found",
      successMessage: null,
      errorMessage: "Please fill in all required fields (Item Name, Category, Color, Location, Date).",
    });
  }

  // Save report
  const createdReport = addReport({
    type: "FOUND",
    title,
    category,
    color,
    location,
    itemDate,
    description,
  });

  // Redirect to details of the newly created report
  res.redirect(`/reports/${createdReport.id}`);
};
