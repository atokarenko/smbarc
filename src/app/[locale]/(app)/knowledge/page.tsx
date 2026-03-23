import { setRequestLocale } from "next-intl/server";
import { KnowledgeContent } from "./knowledge-content";
import type { IndustryProfile } from "@/lib/knowledge/industries/types";
import type { AutomationCase } from "@/lib/knowledge/automation-cases/types";
import type { ComplianceProfile } from "@/lib/knowledge/compliance/types";

async function loadKnowledgeData() {
  const [industriesModule, casesModule, complianceModule] = await Promise.all([
    import("@/lib/knowledge/industries/data"),
    import("@/lib/knowledge/automation-cases/data"),
    import("@/lib/knowledge/compliance/data"),
  ]);

  return {
    industries: Object.values(industriesModule.default) as IndustryProfile[],
    automationCases: casesModule.default as AutomationCase[],
    compliance: complianceModule.default as ComplianceProfile,
  };
}

export default async function KnowledgePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const data = await loadKnowledgeData();

  return (
    <KnowledgeContent
      industries={data.industries}
      automationCases={data.automationCases}
      compliance={data.compliance}
    />
  );
}
