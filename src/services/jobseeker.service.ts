import prisma from "../prisma/client";

export const getJobSeekerProfile = async (userId: string) => {
  const profile = await prisma.jobSeekerProfile.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      }
    },
  });

  return profile;
};

export const createJobSeekerProfile = async (userId: string, profileData: any) => {
  const existingProfile = await prisma.jobSeekerProfile.findUnique({
    where: { userId },
  });

  if (existingProfile) {
    throw new Error("Profile already exists for this user.");
  }

  const profile = await prisma.jobSeekerProfile.create({
    data: {
      userId,
      ...profileData,
    },
  });

  return profile;
}

