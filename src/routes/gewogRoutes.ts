import { Router } from "express"
import { authenticate } from "../middleware/auth.middleware";
import { createGewog, deleteGewog, getGewogById, getGewogs, updateGewog } from "../controllers/gewog.controllers";



const router = Router();

router.post("/", authenticate, createGewog);

router.get("/:id", authenticate, getGewogById);

router.get("/", authenticate, getGewogs);

router.patch("/:id", authenticate, updateGewog);

router.delete("/:id", authenticate, deleteGewog);



export default router;
