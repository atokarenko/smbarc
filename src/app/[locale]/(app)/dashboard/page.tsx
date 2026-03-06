import { headers } from "next/headers";
import { setRequestLocale } from "next-intl/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { DashboardContent } from "./dashboard-content";
import type { AssessmentResults } from "@/lib/demo-data";

async function loadAssessmentData(userId: string): Promise<{
  results: AssessmentResults | null;
  companyName: string | null;
}> {
  // Try user's own completed assessment first
  const userAssessment = await prisma.assessment.findFirst({
    where: { userId, status: "COMPLETE" },
    orderBy: { updatedAt: "desc" },
    select: { results: true, companyId: true },
  });

  if (userAssessment?.results) {
    try {
      const results = JSON.parse(userAssessment.results) as AssessmentResults;
      let companyName: string | null = null;
      if (userAssessment.companyId) {
        const company = await prisma.company.findUnique({
          where: { id: userAssessment.companyId },
          select: { name: true },
        });
        companyName = company?.name ?? null;
      }
      return { results, companyName };
    } catch {
      // Invalid JSON, fall through to demo
    }
  }

  // Fallback to demo company
  const demoCompany = await prisma.company.findFirst({
    where: { isDemo: true },
  });

  if (demoCompany?.assessmentResults) {
    try {
      const results = JSON.parse(demoCompany.assessmentResults) as AssessmentResults;
      return { results, companyName: demoCompany.name };
    } catch {
      // Invalid JSON
    }
  }

  return { results: null, companyName: null };
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let assessmentResults: AssessmentResults | null = null;
  let companyName: string | null = null;
  let role = "ceo";

  if (session?.user) {
    const data = await loadAssessmentData(session.user.id);
    assessmentResults = data.results;
    companyName = data.companyName;
    role = (session.user as { role?: string }).role || "ceo";
  }

  return (
    <DashboardContent
      assessmentResults={assessmentResults}
      companyName={companyName}
      role={role}
    />
  );
}
