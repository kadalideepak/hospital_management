import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

// 1️⃣ Create connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, // directly connect to it
});

// 2️⃣ Connect
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Database connected successfully!");
  }
});

export default db;
