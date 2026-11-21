/**
 * Member 2 - Found Item Controller (found.controller.js)
 * Handles rendering the Found Item form and saving found reports via Prisma ORM
 */

const prisma = require("../db");

// GET /found - Show found item form
exports.showFoundForm = (req, res) => {
  res.render("found", {
    activePage: "found",
    successMessage: null,
    errorMessage: null,
  });
};

// POST /found - Save found item report to SQLite database
exports.submitFoundForm = async (req, res, next) => {
  try {
    const { title, category, color, location, itemDate, description } = req.body;

    // Basic required field validation
    if (!title || !category || !color || !location || !itemDate) {
      return res.render("found", {
        activePage: "found",
        successMessage: null,
        errorMessage: "Please fill in all required fields (Item Name, Category, Color, Location, Date).",
      });
    }

    // Save report in SQLite using Prisma Client create()
    const createdReport = await prisma.report.create({
      data: {
        type: "FOUND",
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
    console.error("Error creating found report:", error);
    next(error);
  }
};
