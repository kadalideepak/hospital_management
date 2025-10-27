import express from "express";
import {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  getPatientsByGender,
  getPatientsByStatus,
  getPatientsByUserId,
} from "../controllers/patientController.js";

const router = express.Router();

router.post("/", createPatient);
router.get("/", getPatients);
router.get("/:id", getPatientById);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);
router.get("/gender/:gender", getPatientsByGender);
router.get("/status/:status", getPatientsByStatus);
router.get("/user/:user_id", getPatientsByUserId);

export default router;
