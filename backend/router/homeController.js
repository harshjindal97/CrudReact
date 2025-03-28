const express = require("express");
const db = require("../dataBase/db");
const verifyToken = require("../middleware/verifyJWT");
const router = express.Router();

router.get("/profile", verifyToken, (req, res) => {
  db.query("SELECT id, name, email FROM users WHERE id = ?", [req.userId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
});

router.get("/getData", verifyToken, (req, res) => {
  const { search } = req.query;
  let sql = "SELECT * FROM users";
  if (search) {
    sql += ` WHERE name LIKE ? OR email LIKE ?`;
  }
  db.query(sql, search ? [`%${search}%`, `%${search}%`, `%${search}%`] : [], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

module.exports = router;