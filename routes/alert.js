import express from "express";
import { alert } from "../controller/alert.js";

const router = express.Router();

router.post("/", alert);

export default router;
