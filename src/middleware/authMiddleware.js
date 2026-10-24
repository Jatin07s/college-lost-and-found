// Express middleware: request ko route tak pahunchne se pehle check karta hai.
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/env");

// Header format: Authorization: Bearer <token>
function authenticate(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Token missing" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}

// Sirf admin ke liye routes
function authorizeAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Admin access only" });
  }
  next();
}

module.exports = { authenticate, authorizeAdmin };
