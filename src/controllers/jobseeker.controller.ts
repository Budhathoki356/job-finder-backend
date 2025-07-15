import { Request, Response } from "express";
import * as JobseekerService from "../services/jobseeker.service";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    if (!userId) res.status(401).json({ error: "Unauthorized" });

    const profile = await JobseekerService.getJobSeekerProfile(userId);

    if (!profile) res.status(404).json({ error: "Profile not found" });

    res.status(200).json({ profile });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createJobSeekerProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const profileData = req.body;

    if (!userId) res.status(401).json({ error: "Unauthorized" });

    const profile = await JobseekerService.createJobSeekerProfile(userId, profileData);

    if (!profile) res.status(400).json({ error: "Profile creation failed" });

    res.status(201).json({ message: "Profile created successfully!" });

  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
