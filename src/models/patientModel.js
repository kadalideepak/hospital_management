import db from "../../config/db.js";

// Create patients table if not exists
db.query(
  `
  CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    date_of_birth DATE,
    gender ENUM('MALE', 'FEMALE', 'OTHERS') NOT NULL,
    contact_number VARCHAR(15),
    status ENUM('ACTIVE', 'DISCHARGED', 'DECEASED') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`,
  (err) => {
    if (err) console.error("❌ Error creating patients table:", err.message);
    else console.log("🏥 Patients table ready!");
  }
);

export default db;
