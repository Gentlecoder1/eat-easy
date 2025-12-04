import express from "express"
import { sendVerificationCode } from "../controllers/authControllers";

const router = express.Router();

router.post("/send-code", sendVerificationCode);

export default router;
