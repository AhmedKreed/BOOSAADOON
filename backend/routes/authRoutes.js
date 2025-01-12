import express from "express";
import { authUser, authCheck } from "../controllers/authControllers.js";

const router = express.Router();

router.route("/").post(authUser);
router.route("/check").post(authCheck);

export default router;
