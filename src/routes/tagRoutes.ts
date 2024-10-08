import express from "express";
import { authController } from "../controllers/authControllers";
import { authGuard } from "../middlewares/authHandler";
import { tagController } from "../controllers/tagControllers";

const router = express.Router();

router.post("/create",tagController.createTag);
router.get("/",tagController.getAllTags);
router.put("/edit/:id",tagController.updateTag);
router.delete("/delete/:id",tagController.deleteTag);


export default router;