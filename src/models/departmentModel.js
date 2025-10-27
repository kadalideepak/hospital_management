import db from "../../config/db.js";

// Create departments table if not exists
db.query(
  `
  CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`,
  (err) => {
    if (err) console.error("❌ Error creating departments table:", err.message);
    else console.log("🏢 Departments table ready!");
  }
);

export default db;
