import { Router } from "express";

import {signup, login, getMe} from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", signup);
router.post('/login', login);
router.get('/me', requireAuth, getMe);

export default router;