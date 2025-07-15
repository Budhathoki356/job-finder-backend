import { PrismaClient } from '@prisma/client';
import { Role } from '../generated/prisma';
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // --- Admin User ---
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example1.com",
      password: "admin", // hash it in production
      role: Role.ADMIN
    }
  });

  // --- Recruiter + Profile + Job ---
  const recruiterUser = await prisma.user.create({
    data: {
      name: "Recruiter Jane",
      email: "recruiter@example.com",
      password: "hashed_recruiter_password",
      role: Role.RECRUITER,
      recruiter: {
        create: {
          companyName: "Tech Corp",
          companyWebsite: "https://techcorp.com",
          description: "A fast-growing tech company",
          industry: "Software"
        }
      }
    },
    include: {
      recruiter: true
    }
  });

  const job = await prisma.job.create({
    data: {
      recruiterId: recruiterUser.recruiter!.id,
      title: "Frontend Developer",
      description: "React developer needed",
      requirements: "2+ years of experience in React",
      location: "Remote",
      salaryRange: "$80,000 - $100,000",
      category: "Software"
    }
  });

  // --- Job Seeker + Profile + Application + SavedJob ---
  const seekerUser = await prisma.user.create({
    data: {
      name: "Job Seeker John",
      email: "seeker@example.com",
      password: "hashed_seeker_password",
      role: Role.JOB_SEEKER,
      jobSeeker: {
        create: {
          bio: "Passionate about frontend development",
          location: "Sydney",
          skills: ["React", "TypeScript", "HTML", "CSS"],
          education: "BSc in Computer Science",
          experience: "2 years at Webify",
          resumeUrl: "https://example.com/resume/john.pdf"
        }
      }
    },
    include: {
      jobSeeker: true
    }
  });

  await prisma.application.create({
    data: {
      jobId: job.id,
      jobSeekerId: seekerUser.jobSeeker!.id,
      coverLetter: "I'm very interested in this opportunity!"
    }
  });

  await prisma.savedJob.create({
    data: {
      jobId: job.id,
      jobSeekerId: seekerUser.jobSeeker!.id
    }
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch(e => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
