/**
 * CampusFind - College Lost & Found Portal
 * Client-Side JavaScript (main.js)
 * Clean, lightweight vanilla JavaScript for UI interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------------------------------------------------
  // 1. Mobile Navigation Toggle
  // -------------------------------------------------------------------------
  const navToggleBtn = document.querySelector(".mobile-nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggleBtn && navLinks) {
    navToggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // -------------------------------------------------------------------------
  // 2. Auto-fill Today's Date in Date Inputs if empty
  // -------------------------------------------------------------------------
  const dateInputs = document.querySelectorAll('input[type="date"]');
  if (dateInputs.length > 0) {
    const today = new Date().toISOString().split("T")[0];
    dateInputs.forEach((input) => {
      if (!input.value) {
        input.value = today;
      }
      // Restrict picking future dates
      input.setAttribute("max", today);
    });
  }

  // -------------------------------------------------------------------------
  // 3. Client-side Search and Filter for Browse Page
  // -------------------------------------------------------------------------
  const searchInput = document.getElementById("search-input");
  const typeFilterButtons = document.querySelectorAll(".type-filter-btn");
  const categoryFilterSelect = document.getElementById("category-filter");
  const itemCards = document.querySelectorAll(".item-card");
  const emptyStateBox = document.getElementById("no-results-state");

  function filterItems() {
    if (!itemCards.length) return;

    const searchTerm = (searchInput ? searchInput.value : "").trim().toLowerCase();
    const activeTypeBtn = document.querySelector(".type-filter-btn.active");
    const selectedType = activeTypeBtn ? activeTypeBtn.getAttribute("data-type") : "ALL";
    const selectedCategory = categoryFilterSelect ? categoryFilterSelect.value : "ALL";

    let visibleCount = 0;

    itemCards.forEach((card) => {
      const title = card.getAttribute("data-title") || "";
      const desc = card.getAttribute("data-desc") || "";
      const type = card.getAttribute("data-type") || "";
      const category = card.getAttribute("data-category") || "";

      const matchesSearch = !searchTerm || title.includes(searchTerm) || desc.includes(searchTerm);
      const matchesType = selectedType === "ALL" || type.toUpperCase() === selectedType.toUpperCase();
      const matchesCategory = selectedCategory === "ALL" || category.toLowerCase() === selectedCategory.toLowerCase();

      if (matchesSearch && matchesType && matchesCategory) {
        card.style.display = "flex";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    if (emptyStateBox) {
      emptyStateBox.style.display = visibleCount === 0 ? "block" : "none";
    }
  }

  // Attach search input listener
  if (searchInput) {
    searchInput.addEventListener("input", filterItems);
  }

  // Attach filter buttons listener
  if (typeFilterButtons.length > 0) {
    typeFilterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        typeFilterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        filterItems();
      });
    });
  }

  // Attach category filter listener
  if (categoryFilterSelect) {
    categoryFilterSelect.addEventListener("change", filterItems);
  }

  // -------------------------------------------------------------------------
  // 4. Form Validation Helper
  // -------------------------------------------------------------------------
  const itemForms = document.querySelectorAll(".report-form");
  itemForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      const titleInput = form.querySelector('input[name="title"]');
      const categorySelect = form.querySelector('select[name="category"]');
      const locationSelect = form.querySelector('select[name="location"]');

      if (titleInput && titleInput.value.trim().length < 3) {
        alert("Please enter a descriptive item name (at least 3 characters).");
        titleInput.focus();
        e.preventDefault();
        return;
      }

      if (categorySelect && !categorySelect.value) {
        alert("Please select an item category.");
        categorySelect.focus();
        e.preventDefault();
        return;
      }

      if (locationSelect && !locationSelect.value) {
        alert("Please select a campus location.");
        locationSelect.focus();
        e.preventDefault();
        return;
      }
    });
  });
});
