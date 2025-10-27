import express from "express";
import {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  getDoctorsByStatus,
  getDoctorsByUserId,
  getDoctorsByDepartmentId,
} from "../controllers/doctorController.js";

const router = express.Router();

router.post("/", createDoctor);
router.get("/", getDoctors);
router.get("/:id", getDoctorById);
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);
router.get("/status/:status", getDoctorsByStatus);
router.get("/user/:user_id", getDoctorsByUserId);
router.get("/department/:department_id", getDoctorsByDepartmentId);

export default router;
