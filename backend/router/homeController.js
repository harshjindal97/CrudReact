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

router.delete("/delete", verifyToken, (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [Number(id)], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  });
});

router.put("/update", verifyToken, (req, res) => {
  const { id, name, email } = req.body;

  if (!id || !name || !email) {
    return res.status(400).json({ error: "User ID, name, and email are required" });
  }

  const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";

  db.query(sql, [name, email, Number(id)], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  });
});





module.exports = router;