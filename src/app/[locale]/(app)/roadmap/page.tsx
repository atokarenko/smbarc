import { setRequestLocale } from "next-intl/server";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PlaceholderPage titleKey="common.navigation.roadmap" />;
}
