import db from "../../config/db.js";

const createBillsTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS bills (
      id INT AUTO_INCREMENT PRIMARY KEY,
      patient_id INT NOT NULL,
      total_amount DECIMAL(10,2) NOT NULL,
      payment_method ENUM('CASH', 'CARD', 'UPI', 'INSURANCE') DEFAULT 'CASH',
      status ENUM('UNPAID', 'PAID', 'CANCELLED') DEFAULT 'UNPAID',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
    );
  `;
  db.query(sql, (err) => {
    if (err) console.error("❌ Error creating bills table:", err);
    else console.log("💰 Bills table ready!");
  });
};

export default createBillsTable;
