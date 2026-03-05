import { setRequestLocale } from "next-intl/server";
import { OnboardingContent } from "./onboarding-content";

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <OnboardingContent />;
}
