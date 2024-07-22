import express from "express";
import { vehicleLocation,accidents,alert ,getcurrentLocation,sendmail,sendsms} from "../controller/vehicle.js";
import verifytoken from "../middleware/auth.js";
const router = express.Router();

router.post("/alert", alert);
router.post("/vehiclelocation",vehicleLocation);

router.post("/accidents",verifytoken, accidents);

router.post("/location",verifytoken, getcurrentLocation);
router.post("/mail",verifytoken, sendmail);
router.post("/sms",verifytoken, sendsms);



export default router;
