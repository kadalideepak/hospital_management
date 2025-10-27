import db from "../../config/db.js";

// Create doctors table if not exists
db.query(
  `
  CREATE TABLE IF NOT EXISTS doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    department_id INT NOT NULL,
    specialization VARCHAR(100),
    experience_years INT,
    status ENUM('AVAILABLE', 'ON_LEAVE', 'RETIRED') DEFAULT 'AVAILABLE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
  )
`,
  (err) => {
    if (err) console.error("❌ Error creating doctors table:", err.message);
    else console.log("🩺 Doctors table ready!");
  }
);

export default db;
