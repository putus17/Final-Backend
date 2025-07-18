import { Router } from "express";
import {
  register,
  login,
  updateUser,
  deleteUser,
  getProfile,
  getUsers, // <- Add this
} from "../controllers/user.controllers";
import { authenticate, roleBasedAccess } from "../middleware/auth.middleware";
import { UserRole } from "../utils/constrants";



const router = Router();

router.post("/adduser", register);
router.post("/login", login);
router.get("/me", authenticate, getProfile);
router.get("/getall", authenticate, getUsers)
router.patch("/:id", authenticate, roleBasedAccess([UserRole.SUPER_ADMIN]),  updateUser);

router.delete("/:id", authenticate, deleteUser);


export default router;
