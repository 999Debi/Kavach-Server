import express from "express";
import { register, login ,chnagePassword,addContact} from "../controller/user.js";
import verifytoken from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/changePassword",verifytoken,chnagePassword);
router.post("/addContact",verifytoken,addContact);

export default router;
