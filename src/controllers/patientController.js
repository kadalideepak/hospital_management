import db from "../models/patientModel.js";

// ➕ Create Patient
export const createPatient = (req, res) => {
  const { user_id, date_of_birth, gender, contact_number, status } = req.body;
  const query = `
    INSERT INTO patients (user_id, date_of_birth, gender, contact_number, status)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(
    query,
    [user_id, date_of_birth, gender, contact_number, status || "ACTIVE"],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      db.query(
        "SELECT * FROM patients WHERE id = ?",
        [result.insertId],
        (err2, rows) => {
          if (err2) return res.status(500).json({ error: err2.message });
          res.status(201).json(rows[0]);
        }
      );
    }
  );
};

// 📋 Get all patients (with user details)
export const getPatients = (req, res) => {
  const query = `
    SELECT p.*, u.name AS user_name, u.email AS user_email
    FROM patients p
    JOIN users u ON p.user_id = u.id
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// 🧾 Get patient by ID
export const getPatientById = (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT p.*, u.name AS user_name, u.email AS user_email
    FROM patients p
    JOIN users u ON p.user_id = u.id
    WHERE p.id = ?
  `;
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "Patient not found" });
    res.json(results[0]);
  });
};

// ✏️ Update Patient
export const updatePatient = (req, res) => {
  const { id } = req.params;
  const { user_id, date_of_birth, gender, contact_number, status } = req.body;
  const query = `
    UPDATE patients 
    SET user_id=?, date_of_birth=?, gender=?, contact_number=?, status=?
    WHERE id=?
  `;
  db.query(
    query,
    [user_id, date_of_birth, gender, contact_number, status, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      db.query("SELECT * FROM patients WHERE id = ?", [id], (err2, rows) => {
        if (err2) return res.status(500).json({ error: err2.message });
        res.json(rows[0]);
      });
    }
  );
};

// ❌ Delete Patient
export const deletePatient = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM patients WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Patient deleted successfully!" });
  });
};

// 🚻 Filter by Gender (MALE/FEMALE/OTHERS)
export const getPatientsByGender = (req, res) => {
  const { gender } = req.params;
  const query = `
    SELECT p.*, u.name AS user_name, u.email AS user_email
    FROM patients p
    JOIN users u ON p.user_id = u.id
    WHERE p.gender = ?
  `;
  db.query(query, [gender.toUpperCase()], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// ⚙️ Filter by Status (ACTIVE/DISCHARGED/DECEASED)
export const getPatientsByStatus = (req, res) => {
  const { status } = req.params;
  const query = `
    SELECT p.*, u.name AS user_name, u.email AS user_email
    FROM patients p
    JOIN users u ON p.user_id = u.id
    WHERE p.status = ?
  `;
  db.query(query, [status.toUpperCase()], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// 🔍 Filter by User ID
export const getPatientsByUserId = (req, res) => {
  const { user_id } = req.params;
  const query = `
    SELECT p.*, u.name AS user_name, u.email AS user_email
    FROM patients p
    JOIN users u ON p.user_id = u.id
    WHERE p.user_id = ?
  `;
  db.query(query, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
