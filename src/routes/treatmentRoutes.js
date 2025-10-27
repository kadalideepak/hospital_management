import express from "express";
import {
  createTreatment,
  getAllTreatments,
  getTreatmentById,
  getTreatmentsByAppointment,
  getTreatmentsByStatus,
  updateTreatment,
  deleteTreatment,
} from "../controllers/treatmentController.js";

const router = express.Router();

// CRUD routes
router.post("/", createTreatment);
router.get("/", getAllTreatments);
router.get("/:id", getTreatmentById);
router.put("/:id", updateTreatment);
router.delete("/:id", deleteTreatment);

// Extra routes
router.get("/appointment/:appointment_id", getTreatmentsByAppointment);
router.get("/status/:status", getTreatmentsByStatus);

export default router;
