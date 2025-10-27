import express from "express";
import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  getAppointmentsByDoctor,
  getAppointmentsByStatus,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

// CRUD aaa
router.post("/", createAppointment);
router.get("/", getAllAppointments);
router.get("/:id", getAppointmentById);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

// Extra APIs
router.get("/doctor/:doctor_id", getAppointmentsByDoctor);
router.get("/status/:status", getAppointmentsByStatus);

export default router;
