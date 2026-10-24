// Prisma client ka single instance, poore project mein yahi import hoga.
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = prisma;
