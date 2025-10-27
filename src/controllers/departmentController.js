import db from "../models/departmentModel.js";

// ➕ Create Department
export const createDepartment = (req, res) => {
  const { name, description, status } = req.body;
  const query = `INSERT INTO departments (name, description, status) VALUES (?, ?, ?)`;
  db.query(query, [name, description, status || "ACTIVE"], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    db.query(
      "SELECT * FROM departments WHERE id = ?",
      [result.insertId],
      (err2, rows) => {
        if (err2) return res.status(500).json({ error: err2.message });
        res.status(201).json(rows[0]);
      }
    );
  });
};

// 📋 Get all departments
export const getDepartments = (req, res) => {
  db.query("SELECT * FROM departments", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// 🧾 Get department by ID
export const getDepartmentById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM departments WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "Department not found" });
    res.json(results[0]);
  });
};

// ✏️ Update Department
export const updateDepartment = (req, res) => {
  const { id } = req.params;
  const { name, description, status } = req.body;
  const query = `UPDATE departments SET name=?, description=?, status=? WHERE id=?`;
  db.query(query, [name, description, status, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    db.query("SELECT * FROM departments WHERE id = ?", [id], (err2, rows) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json(rows[0]);
    });
  });
};

// ❌ Delete Department
export const deleteDepartment = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM departments WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Department deleted successfully!" });
  });
};

// ⚙️ Filter departments by status (ACTIVE/INACTIVE)
export const getDepartmentsByStatus = (req, res) => {
  const { status } = req.params;
  db.query(
    "SELECT * FROM departments WHERE status = ?",
    [status.toUpperCase()],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};
