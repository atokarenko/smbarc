import { headers } from "next/headers";
import { setRequestLocale } from "next-intl/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { ModulesContent } from "./modules-content";
import type { AssessmentResults } from "@/lib/demo-data";

async function loadAssessmentData(userId: string): Promise<{
  results: AssessmentResults | null;
}> {
  // Try user's own completed assessment first
  const userAssessment = await prisma.assessment.findFirst({
    where: { userId, status: "COMPLETE" },
    orderBy: { updatedAt: "desc" },
    select: { results: true },
  });

  if (userAssessment?.results) {
    try {
      const results = JSON.parse(
        userAssessment.results
      ) as AssessmentResults;
      return { results };
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
      const results = JSON.parse(
        demoCompany.assessmentResults
      ) as AssessmentResults;
      return { results };
    } catch {
      // Invalid JSON
    }
  }

  return { results: null };
}

export default async function ModulesPage({
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

  if (session?.user) {
    const data = await loadAssessmentData(session.user.id);
    assessmentResults = data.results;
  }

  return (
    <ModulesContent
      assessmentResults={assessmentResults}
    />
  );
}
