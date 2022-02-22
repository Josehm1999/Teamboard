import express from "express";

import { listRoles, registerRole } from "../controllers/roleController.js";

const router = express.Router();

router.post("/registerRole", registerRole);
router.get("/", listRoles);
export default router;
