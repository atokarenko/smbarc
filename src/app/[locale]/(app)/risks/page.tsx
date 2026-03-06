import { headers } from "next/headers";
import { setRequestLocale } from "next-intl/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import type { AssessmentResults } from "@/lib/demo-data";
import { RiskMapContent } from "./risk-map-content";

async function loadAssessmentData(
  userId: string
): Promise<AssessmentResults | null> {
  const userAssessment = await prisma.assessment.findFirst({
    where: { userId, status: "COMPLETE" },
    orderBy: { updatedAt: "desc" },
    select: { results: true },
  });

  if (userAssessment?.results) {
    try {
      return JSON.parse(userAssessment.results) as AssessmentResults;
    } catch {
      // Invalid JSON, fall through to demo
    }
  }

  const demoCompany = await prisma.company.findFirst({
    where: { isDemo: true },
  });

  if (demoCompany?.assessmentResults) {
    try {
      return JSON.parse(demoCompany.assessmentResults) as AssessmentResults;
    } catch {
      // Invalid JSON
    }
  }

  return null;
}

export default async function RisksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let assessment: AssessmentResults | null = null;
  let role = "ceo";

  if (session?.user) {
    assessment = await loadAssessmentData(session.user.id);
    role = (session.user as { role?: string }).role || "ceo";
  }

  return (
    <RiskMapContent items={assessment?.riskMap ?? []} role={role} />
  );
}
