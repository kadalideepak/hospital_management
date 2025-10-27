import db from "../../config/db.js";
import dotenv from "dotenv";
dotenv.config();

db.changeUser({ database: process.env.DB_NAME });

// Create table if not exists
db.query(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role ENUM('ADMIN', 'DOCTOR', 'PATIENT', 'STAFF') NOT NULL,
    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`,
  (err) => {
    if (err) console.error("Error creating users table:", err.message);
    else console.log("🧍‍♂️ Users table ready!");
  }
);

export default db;
