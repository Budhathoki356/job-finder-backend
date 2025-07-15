import { z } from "zod";

export const profileSchema = z.object({
  bio: z.string().min(1).max(500).optional(),
  location: z.string().min(1).max(500).optional(),
  skills: z.array(z.string().min(1)).optional(),
  education: z.string().min(1).max(500).optional(),
  experience: z.string().min(1).max(500).optional(),
  resumeUrl: z.string().min(1).max(500).optional(),
}).strict();
