import { PrismaClient } from "@prisma/client";
import { DEMO_COMPANIES } from "../src/lib/demo-data";

const prisma = new PrismaClient();

const DEMO_USERS = [
  {
    email: "demo-ceo@ai-architect.local",
    name: "Demo CEO",
    role: "ceo",
  },
  {
    email: "demo-coo@ai-architect.local",
    name: "Demo COO",
    role: "coo",
  },
  {
    email: "demo-cto@ai-architect.local",
    name: "Demo CTO",
    role: "cto",
  },
];

async function seed() {
  console.log("Seeding demo data...");

  // Clean existing demo data
  await prisma.company.deleteMany({ where: { isDemo: true } });

  // Seed demo companies
  for (const company of DEMO_COMPANIES) {
    await prisma.company.create({
      data: {
        name: company.name,
        industry: company.industry,
        size: company.size,
        description: company.description,
        isDemo: true,
        assessmentResults: JSON.stringify(company.assessmentResults),
      },
    });
    console.log(`  Created demo company: ${company.name}`);
  }

  // Seed demo users (upsert to handle re-runs)
  // Note: Demo users are created without passwords here.
  // Better Auth creates them with hashed passwords via signUp on first demo login.
  // We pre-create the user records so they exist in the DB for display purposes.
  for (const user of DEMO_USERS) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: { name: user.name, role: user.role },
      create: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
    console.log(`  Upserted demo user: ${user.email}`);
  }

  console.log("Seeding complete.");
}

seed()
  .catch((error) => {
    console.error("Seed error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
