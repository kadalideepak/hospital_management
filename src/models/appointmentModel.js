import db from "../../config/db.js";

// Create Appointments Table
const createAppointmentsTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS appointments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      doctor_id INT NOT NULL,
      patient_id INT NOT NULL,
      appointment_date DATETIME NOT NULL,
      reason VARCHAR(255),
      status ENUM('SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW') DEFAULT 'SCHEDULED',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
      FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
    );
  `;
  db.query(sql, (err) => {
    if (err) console.error("❌ Error creating appointments table:", err);
    else console.log("📅 Appointments table ready!");
  });
};

export default createAppointmentsTable;
