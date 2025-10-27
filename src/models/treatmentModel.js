import db from "../../config/db.js";

const createTreatmentsTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS treatments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      appointment_id INT NOT NULL,
      description TEXT,
      prescribed_medicine VARCHAR(255),
      follow_up_date DATE,
      status ENUM('ONGOING', 'COMPLETED', 'CANCELLED') DEFAULT 'ONGOING',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE
    );
  `;

  db.query(sql, (err) => {
    if (err) console.error("❌ Error creating treatments table:", err);
    else console.log("💊 Treatments table ready!");
  });
};

export default createTreatmentsTable;
