import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js";
import departmentRoutes from "./src/routes/departmentRoutes.js";
import doctorRoutes from "./src/routes/doctorRoutes.js";
import patientRoutes from "./src/routes/patientRoutes.js";
import createAppointmentsTable from "./src/models/appointmentModel.js";
import appointmentRoutes from "./src/routes/appointmentRoutes.js";
import createTreatmentsTable from "./src/models/treatmentModel.js";
import treatmentRoutes from "./src/routes/treatmentRoutes.js";
import createBillsTable from "./src/models/billModel.js";
import billRoutes from "./src/routes/billRoutes.js";
import "./config/db.js"; // initialize DB connection

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/treatments", treatmentRoutes);
app.use("/api/bills", billRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
createAppointmentsTable();
createTreatmentsTable();
createBillsTable();
