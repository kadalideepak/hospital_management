import db from "../models/userModel.js";

// ➕ Create user
export const createUser = (req, res) => {
  const { name, email, role, status } = req.body;
  const query = `INSERT INTO users (name, email, role, status) VALUES (?, ?, ?, ?)`;
  db.query(query, [name, email, role, status || "ACTIVE"], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "User created successfully!" });
  });
};

// 📋 Get all users
export const getUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// 🧾 Get user by ID
export const getUserById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "User not found" });
    res.json(results[0]);
  });
};

// ✏️ Update user
export const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, role, status } = req.body;
  const query = `UPDATE users SET name=?, email=?, role=?, status=? WHERE id=?`;
  db.query(query, [name, email, role, status, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User updated successfully!" });
  });
};

// ❌ Delete user
export const deleteUser = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User deleted successfully!" });
  });
};

// 🧍 Filter by role (ADMIN, DOCTOR, etc.)
export const getUsersByRole = (req, res) => {
  const { role } = req.params;
  db.query(
    "SELECT * FROM users WHERE role = ?",
    [role.toUpperCase()],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

// ⚙️ Filter by status (ACTIVE, INACTIVE)
export const getUsersByStatus = (req, res) => {
  const { status } = req.params;
  db.query(
    "SELECT * FROM users WHERE status = ?",
    [status.toUpperCase()],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};
