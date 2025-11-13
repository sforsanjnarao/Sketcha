import {Router } from "express";
import type {Router as ExpressRouter } from "express";
import { middleware } from "../middleware";
import { roomes } from "../controller/roomes.controller";

const router: ExpressRouter =Router()

router.post('/create-room',middleware, roomes)


export default router