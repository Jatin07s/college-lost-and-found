/**
 * CampusFind - Shared Prisma Database Client (db.js)
 * Provides singleton PrismaClient instance for database queries
 */

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = prisma;
