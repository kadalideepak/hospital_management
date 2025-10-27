import db from "../../config/db.js";

// ✅ Create Bill
export const createBill = (req, res) => {
  const { patient_id, total_amount, payment_method, status } = req.body;
  const sql = `
    INSERT INTO bills (patient_id, total_amount, payment_method, status)
    VALUES (?, ?, ?, ?)
  `;
  db.query(
    sql,
    [patient_id, total_amount, payment_method, status || "UNPAID"],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Bill created successfully", id: result.insertId });
    }
  );
};

// ✅ Get All Bills
export const getAllBills = (req, res) => {
  db.query("SELECT * FROM bills", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// ✅ Get Bill by ID
export const getBillById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM bills WHERE id = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0)
      return res.status(404).json({ message: "Bill not found" });
    res.json(rows[0]);
  });
};

// ✅ Get Bills by Patient ID
export const getBillsByPatient = (req, res) => {
  const { patient_id } = req.params;
  const sql = `
    SELECT b.*, u.name AS patient_name, u.email AS patient_email
    FROM bills b
    JOIN patients p ON b.patient_id = p.id
    JOIN users u ON p.user_id = u.id
    WHERE b.patient_id = ?;
  `;
  db.query(sql, [patient_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// ✅ Update Bill
export const updateBill = (req, res) => {
  const { id } = req.params;
  const { patient_id, total_amount, payment_method, status } = req.body;
  const sql = `
    UPDATE bills 
    SET patient_id=?, total_amount=?, payment_method=?, status=?, updated_at=CURRENT_TIMESTAMP
    WHERE id=?
  `;
  db.query(
    sql,
    [patient_id, total_amount, payment_method, status, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Bill updated successfully" });
    }
  );
};

// ✅ Delete Bill
export const deleteBill = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM bills WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Bill deleted successfully" });
  });
};
