/**
 * CampusFind - Database Seed Script (seed.js)
 * Populates SQLite database with initial sample reports for testing
 */

require("dotenv").config();
const prisma = require("../src/db");

const initialReports = [
  {
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

async function seed() {
  console.log("Seeding initial reports into SQLite database...");

  // Delete existing records to avoid duplication on re-seed
  await prisma.report.deleteMany({});

  for (const report of initialReports) {
    const created = await prisma.report.create({ data: report });
    console.log(`Created ${created.type} report: #${created.id} - ${created.title}`);
  }

  console.log("Database seeded successfully!");
}

seed()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
