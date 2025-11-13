import {Router } from "express";
import type {Router as ExpressRouter } from "express";

import { signinController, signupController } from "../controller/auth.controller";
import { middleware} from "../middleware";
const router: ExpressRouter =Router()

router.post('/signup',signupController)
router.post('/signin',signinController)
router.get("/me", middleware, async (req, res) => {
  res.json({ message: "You are authenticated", userId: (req as any).userId });
});


export default router