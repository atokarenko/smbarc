import { headers } from "next/headers";
import { setRequestLocale } from "next-intl/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { AssessmentFlow } from "./assessment-flow";

export default async function ScanPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Find latest incomplete assessment for this user
  let assessment = null;
  let userRole = "ceo";

  if (session?.user) {
    assessment = await prisma.assessment.findFirst({
      where: {
        userId: session.user.id,
        status: { not: "COMPLETE" },
      },
      orderBy: { createdAt: "desc" },
    });

    // Get user role from User model
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (user?.role) {
      userRole = user.role;
    }
  }

  // Serialize assessment data for client component
  const assessmentData = assessment
    ? {
        id: assessment.id,
        status: assessment.status,
        currentSection: assessment.currentSection,
        aiDecideMode: assessment.aiDecideMode,
        answers: assessment.answers ? JSON.parse(assessment.answers) : {},
        followUpAnswers: assessment.followUpAnswers
          ? JSON.parse(assessment.followUpAnswers)
          : {},
        locale: assessment.locale,
      }
    : null;

  return (
    <AssessmentFlow
      assessment={assessmentData}
      locale={locale}
      userRole={userRole}
    />
  );
}
