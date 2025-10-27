import express from "express";
import {
  createBill,
  getAllBills,
  getBillById,
  getBillsByPatient,
  updateBill,
  deleteBill,
} from "../controllers/billController.js";

const router = express.Router();

// CRUD
router.post("/", createBill);
router.get("/", getAllBills);
router.get("/:id", getBillById);
router.put("/:id", updateBill);
router.delete("/:id", deleteBill);

// Extra API
router.get("/patient/:patient_id", getBillsByPatient);

export default router;
