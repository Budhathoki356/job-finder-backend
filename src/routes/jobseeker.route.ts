import { Router } from "express";

import { authorizeRoles, requireAuth } from "../middleware/auth.middleware";
import { createJobSeekerProfile, getProfile } from "../controllers/jobseeker.controller";
import { validate } from "../middleware/validate.middleware";
import { profileSchema } from "../validators/jobseeker.schema";

const router = Router();

router
    .route("/profile")
    .get(requireAuth, authorizeRoles("JOB_SEEKER"), getProfile)
    .post(requireAuth, authorizeRoles("JOB_SEEKER"), validate(profileSchema), createJobSeekerProfile);

export default router;
