// Saare routers yahan mount hote hain.
const express = require("express");
const authRoutes = require("./authRoutes");
const itemRoutes = require("./itemRoutes");
const claimRoutes = require("./claimRoutes");

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ success: true, message: "API is running" });
});

router.use("/auth", authRoutes);
router.use("/items", itemRoutes);   // Member 2
router.use("/claims", claimRoutes); // Member 3

module.exports = router;
