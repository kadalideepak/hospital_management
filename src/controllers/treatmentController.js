import db from "../../config/db.js";

// ✅ Create Treatment
export const createTreatment = (req, res) => {
  const {
    appointment_id,
    description,
    prescribed_medicine,
    follow_up_date,
    status,
  } = req.body;

  const sql = `
    INSERT INTO treatments (appointment_id, description, prescribed_medicine, follow_up_date, status)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(
    sql,
    [
      appointment_id,
      description,
      prescribed_medicine,
      follow_up_date,
      status || "ONGOING",
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({
        message: "Treatment created successfully",
        id: result.insertId,
      });
    }
  );
};

// ✅ Get All Treatments
export const getAllTreatments = (req, res) => {
  db.query("SELECT * FROM treatments", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// ✅ Get Treatment by ID
export const getTreatmentById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM treatments WHERE id = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0)
      return res.status(404).json({ message: "Treatment not found" });
    res.json(rows[0]);
  });
};

// ✅ Get Treatments by Appointment ID
export const getTreatmentsByAppointment = (req, res) => {
  const { appointment_id } = req.params;

  const sql = `
    SELECT t.*, a.appointment_date, a.reason, a.status AS appointment_status
    FROM treatments t
    JOIN appointments a ON t.appointment_id = a.id
    WHERE t.appointment_id = ?
  `;

  db.query(sql, [appointment_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// ✅ Get Treatments by Status
export const getTreatmentsByStatus = (req, res) => {
  const { status } = req.params;
  db.query(
    "SELECT * FROM treatments WHERE status = ?",
    [status],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
};

// ✅ Update Treatment
export const updateTreatment = (req, res) => {
  const { id } = req.params;
  const {
    appointment_id,
    description,
    prescribed_medicine,
    follow_up_date,
    status,
  } = req.body;

  const sql = `
    UPDATE treatments 
    SET appointment_id=?, description=?, prescribed_medicine=?, follow_up_date=?, status=?, updated_at=CURRENT_TIMESTAMP
    WHERE id=?
  `;
  db.query(
    sql,
    [
      appointment_id,
      description,
      prescribed_medicine,
      follow_up_date,
      status,
      id,
    ],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Treatment updated successfully" });
    }
  );
};

// ✅ Delete Treatment
export const deleteTreatment = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM treatments WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Treatment deleted successfully" });
  });
};
