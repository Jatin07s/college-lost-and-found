/**
 * CampusFind - College Lost & Found Portal
 * Initial Sample Data Store (reports.js)
 * Provides realistic demo records for immediate UI preview and testing
 */

let nextReportId = 105;

const initialReports = [
  {
    id: 101,
    type: "LOST",
    title: "Black Water Bottle",
    category: "Bottle",
    color: "Black",
    location: "Central Library",
    itemDate: new Date("2026-11-16"),
    description: "Milton steel bottle with a small silver scratch near the cap. Last used at the 2nd floor study cubicle.",
    status: "OPEN",
    createdAt: new Date("2026-11-16T10:30:00Z"),
  },
  {
    id: 102,
    type: "FOUND",
    title: "Water Bottle",
    category: "Bottle",
    color: "Black",
    location: "Central Library",
    itemDate: new Date("2026-11-17"),
    description: "Found on table 14 in Central Library reading hall. Handed over to security desk.",
    status: "OPEN",
    createdAt: new Date("2026-11-17T14:15:00Z"),
  },
  {
    id: 103,
    type: "LOST",
    title: "Casio FX-991EX Calculator",
    category: "Electronics",
    color: "Black",
    location: "Computer Lab 1",
    itemDate: new Date("2026-11-17"),
    description: "Classwiz calculator with student name sticker 'Jatin' on the back cover.",
    status: "OPEN",
    createdAt: new Date("2026-11-17T16:00:00Z"),
  },
  {
    id: 104,
    type: "FOUND",
    title: "College ID Card & Lanyard",
    category: "Cards & IDs",
    color: "Blue",
    location: "Main Canteen",
    itemDate: new Date("2026-11-18"),
    description: "Blue college lanyard with student ID card. Deposited at student helpdesk.",
    status: "OPEN",
    createdAt: new Date("2026-11-18T09:00:00Z"),
  },
];

// In-memory array of reports
const reports = [...initialReports];

module.exports = {
  getAllReports: () => [...reports],
  
  getRecentReports: (limit = 3) => {
    return [...reports]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  },

  getReportById: (id) => {
    const numId = parseInt(id, 10);
    return reports.find((item) => item.id === numId) || null;
  },

  addReport: (data) => {
    const newReport = {
      id: nextReportId++,
      type: data.type || "LOST",
      title: data.title.trim(),
      category: data.category,
      color: data.color,
      location: data.location,
      itemDate: new Date(data.itemDate || Date.now()),
      description: (data.description || "").trim(),
      status: "OPEN",
      createdAt: new Date(),
    };

    reports.unshift(newReport);
    return newReport;
  },
};
