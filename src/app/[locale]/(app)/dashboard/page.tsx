import { headers } from "next/headers";
import { setRequestLocale } from "next-intl/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { DashboardContent } from "./dashboard-content";
import type { AssessmentResults } from "@/lib/demo-data";

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

  if (session?.user) {
    // Find the first demo company to display data
    const demoCompany = await prisma.company.findFirst({
      where: { isDemo: true },
    });

    if (demoCompany?.assessmentResults) {
      try {
        assessmentResults = JSON.parse(demoCompany.assessmentResults) as AssessmentResults;
        companyName = demoCompany.name;
      } catch {
        // Invalid JSON, leave as null
      }
    }
  }

  return (
    <DashboardContent
      assessmentResults={assessmentResults}
      companyName={companyName}
    />
  );
}
