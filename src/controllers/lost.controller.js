/**
 * Member 1 - Lost Item Controller (lost.controller.js)
 * Handles rendering the Lost Item form and saving lost reports via Prisma ORM
 */

const prisma = require("../db");

// GET /lost - Show lost item form
exports.showLostForm = (req, res) => {
  res.render("lost", {
    activePage: "lost",
    successMessage: null,
    errorMessage: null,
  });
};

// POST /lost - Save lost item report to SQLite database
exports.submitLostForm = async (req, res, next) => {
  try {
    const { title, category, color, location, itemDate, description } = req.body;

    // Basic required field validation
    if (!title || !category || !color || !location || !itemDate) {
      return res.render("lost", {
        activePage: "lost",
        successMessage: null,
        errorMessage: "Please fill in all required fields (Item Name, Category, Color, Location, Date).",
      });
    }

    // Save report in SQLite using Prisma Client create()
    const createdReport = await prisma.report.create({
      data: {
        type: "LOST",
        title: title.trim(),
        category,
        color,
        location,
        itemDate: new Date(itemDate),
        description: (description || "").trim(),
        status: "OPEN",
      },
    });

    // Redirect to details of the newly created report
    res.redirect(`/reports/${createdReport.id}`);
  } catch (error) {
    console.error("Error creating lost report:", error);
    next(error);
  }
};
