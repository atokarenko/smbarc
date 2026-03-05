"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const INDUSTRIES = [
  { value: "retail", labelKey: "onboarding.industries.retail" },
  { value: "finance", labelKey: "onboarding.industries.finance" },
  { value: "manufacturing", labelKey: "onboarding.industries.manufacturing" },
  { value: "technology", labelKey: "onboarding.industries.technology" },
  { value: "healthcare", labelKey: "onboarding.industries.healthcare" },
  { value: "other", labelKey: "onboarding.industries.other" },
];

export function OnboardingContent() {
  const t = useTranslations();
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("ceo");
  const [industry, setIndustry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    // For POC, just redirect to dashboard
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t("onboarding.welcome")}</CardTitle>
          <CardDescription>{t("onboarding.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="companyName">
                {t("onboarding.companyName")}
              </label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder={t("onboarding.companyPlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("onboarding.selectRole")}
              </label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ceo">{t("common.roles.ceo")}</SelectItem>
                  <SelectItem value="coo">{t("common.roles.coo")}</SelectItem>
                  <SelectItem value="cto">{t("common.roles.cto")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("onboarding.selectIndustry")}
              </label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder={t("onboarding.industryPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((ind) => (
                    <SelectItem key={ind.value} value={ind.value}>
                      {t(ind.labelKey)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? t("onboarding.submitting") : t("onboarding.continue")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
