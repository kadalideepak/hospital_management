import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUsersByRole,
  getUsersByStatus,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// Filter APIs
router.get("/role/:role", getUsersByRole);
router.get("/status/:status", getUsersByStatus);

export default router;
