import express from "express";
import { accidents,alert } from "../controller/vehicle.js";
import verifytoken from "../middleware/auth.js";
const router = express.Router();

router.post("/alert", alert);
router.post("/accidents",verifytoken, accidents);



export default router;
