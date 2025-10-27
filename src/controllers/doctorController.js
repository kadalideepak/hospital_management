import db from "../models/doctorModel.js";

// ➕ Create Doctor
export const createDoctor = (req, res) => {
  const { user_id, department_id, specialization, experience_years, status } =
    req.body;
  const query = `
    INSERT INTO doctors (user_id, department_id, specialization, experience_years, status)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(
    query,
    [
      user_id,
      department_id,
      specialization,
      experience_years,
      status || "AVAILABLE",
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      db.query(
        "SELECT * FROM doctors WHERE id = ?",
        [result.insertId],
        (err2, rows) => {
          if (err2) return res.status(500).json({ error: err2.message });
          res.status(201).json(rows[0]);
        }
      );
    }
  );
};

// 📋 Get all doctors
export const getDoctors = (req, res) => {
  const query = `
    SELECT d.*, u.name AS user_name, dep.name AS department_name
    FROM doctors d
    JOIN users u ON d.user_id = u.id
    JOIN departments dep ON d.department_id = dep.id
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// 🧾 Get doctor by ID
export const getDoctorById = (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT d.*, u.name AS user_name, dep.name AS department_name
    FROM doctors d
    JOIN users u ON d.user_id = u.id
    JOIN departments dep ON d.department_id = dep.id
    WHERE d.id = ?
  `;
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "Doctor not found" });
    res.json(results[0]);
  });
};

// ✏️ Update doctor
export const updateDoctor = (req, res) => {
  const { id } = req.params;
  const { user_id, department_id, specialization, experience_years, status } =
    req.body;
  const query = `
    UPDATE doctors 
    SET user_id=?, department_id=?, specialization=?, experience_years=?, status=? 
    WHERE id=?
  `;
  db.query(
    query,
    [user_id, department_id, specialization, experience_years, status, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      db.query("SELECT * FROM doctors WHERE id = ?", [id], (err2, rows) => {
        if (err2) return res.status(500).json({ error: err2.message });
        res.json(rows[0]);
      });
    }
  );
};

// ❌ Delete doctor
export const deleteDoctor = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM doctors WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Doctor deleted successfully!" });
  });
};

// 🩺 Filter by status (AVAILABLE / ON_LEAVE / RETIRED)
export const getDoctorsByStatus = (req, res) => {
  const { status } = req.params;
  const query = `
    SELECT d.*, u.name AS user_name, dep.name AS department_name
    FROM doctors d
    JOIN users u ON d.user_id = u.id
    JOIN departments dep ON d.department_id = dep.id
    WHERE d.status = ?
  `;
  db.query(query, [status.toUpperCase()], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// 🔍 Get doctors by user_id
export const getDoctorsByUserId = (req, res) => {
  const { user_id } = req.params;
  const query = `
    SELECT d.*, u.name AS user_name, dep.name AS department_name
    FROM doctors d
    JOIN users u ON d.user_id = u.id
    JOIN departments dep ON d.department_id = dep.id
    WHERE d.user_id = ?
  `;
  db.query(query, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// 🔍 Get doctors by department_id
export const getDoctorsByDepartmentId = (req, res) => {
  const { department_id } = req.params;
  const query = `
    SELECT d.*, u.name AS user_name, dep.name AS department_name
    FROM doctors d
    JOIN users u ON d.user_id = u.id
    JOIN departments dep ON d.department_id = dep.id
    WHERE d.department_id = ?
  `;
  db.query(query, [department_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
