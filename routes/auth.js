import express from "express";
import { register, login ,changePassword,addContact,allContacts} from "../controller/user.js";
import verifytoken from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/changePassword",verifytoken,changePassword);
router.post("/addContact",verifytoken,addContact);
router.post("/contact",verifytoken,allContacts);

export default router;
