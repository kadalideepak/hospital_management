import db from "../../config/db.js";

// ✅ Create Appointment
export const createAppointment = (req, res) => {
  const { doctor_id, patient_id, appointment_date, reason, status } = req.body;
  const sql = `INSERT INTO appointments (doctor_id, patient_id, appointment_date, reason, status)
               VALUES (?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [doctor_id, patient_id, appointment_date, reason, status],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({
        message: "Appointment created successfully",
        id: result.insertId,
      });
    }
  );
};

// ✅ Get All Appointments
export const getAllAppointments = (req, res) => {
  db.query("SELECT * FROM appointments", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// ✅ Get Appointment by ID (Show doctor info)
export const getAppointmentById = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT a.*, d.specialization, u.name AS doctor_name
    FROM appointments a
    JOIN doctors d ON a.doctor_id = d.id
    JOIN users u ON d.user_id = u.id
    WHERE a.id = ?;
  `;
  db.query(sql, [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0)
      return res.status(404).json({ message: "Appointment not found" });
    res.json(rows[0]);
  });
};

// ✅ Get Appointments by Doctor ID
export const getAppointmentsByDoctor = (req, res) => {
  const { doctor_id } = req.params;
  const sql = `
    SELECT a.*, p.id AS patient_id, u.name AS patient_name
    FROM appointments a
    JOIN patients p ON a.patient_id = p.id
    JOIN users u ON p.user_id = u.id
    WHERE a.doctor_id = ?;
  `;
  db.query(sql, [doctor_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// ✅ Get Appointments by Status
export const getAppointmentsByStatus = (req, res) => {
  const { status } = req.params;
  const sql = `SELECT * FROM appointments WHERE status = ?`;
  db.query(sql, [status], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// ✅ Update Appointment
export const updateAppointment = (req, res) => {
  const { id } = req.params;
  const { doctor_id, patient_id, appointment_date, reason, status } = req.body;
  const sql = `
    UPDATE appointments 
    SET doctor_id=?, patient_id=?, appointment_date=?, reason=?, status=?, updated_at=CURRENT_TIMESTAMP 
    WHERE id=?;
  `;
  db.query(
    sql,
    [doctor_id, patient_id, appointment_date, reason, status, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Appointment updated successfully" });
    }
  );
};

// ✅ Delete Appointment
export const deleteAppointment = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM appointments WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Appointment deleted successfully" });
  });
};
