// PLACEHOLDER: Member 2 isko replace karega (full CRUD).
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ success: true, data: [] });
});

module.exports = router;
