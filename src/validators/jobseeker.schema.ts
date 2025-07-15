import { z } from "zod";

export const profileSchema = z.object({
  bio: z.string().min(1).max(500).optional(),
  location: z.string().min(1).max(100).optional(),
  skills: z.array(z.string().min(1)).optional(),
});