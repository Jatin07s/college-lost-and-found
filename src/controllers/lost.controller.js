/**
 * Member 1 - Jatin
 * Handles rendering the Lost Item form and processing submissions
 */

const { addReport } = require("../data/reports");

// GET /lost - Show lost item form
exports.showLostForm = (req, res) => {
  res.render("lost", {
    activePage: "lost",
    successMessage: null,
    errorMessage: null,
  });
};

// POST /lost - Save lost item report
exports.submitLostForm = (req, res) => {
  const { title, category, color, location, itemDate, description } = req.body;

  // Basic validation
  if (!title || !category || !color || !location || !itemDate) {
    return res.render("lost", {
      activePage: "lost",
      successMessage: null,
      errorMessage: "Please fill in all required fields (Item Name, Category, Color, Location, Date).",
    });
  }

  // Save report
  const createdReport = addReport({
    type: "LOST",
    title,
    category,
    color,
    location,
    itemDate,
    description,
  });

  // Redirect to details of the newly created report or show confirmation
  res.redirect(`/reports/${createdReport.id}`);
};
