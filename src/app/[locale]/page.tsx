import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { LocaleSwitcher } from "@/components/i18n/locale-switcher";
import { Button } from "@/components/ui/button";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="absolute right-4 top-4">
        <LocaleSwitcher />
      </div>

      <h1 className="text-4xl font-bold">{t("common.appName")}</h1>
      <p className="text-muted-foreground text-lg">
        {t("demo.subtitle")}
      </p>

      <div className="flex gap-4">
        <Button size="lg">{t("common.actions.tryDemo")}</Button>
        <Button size="lg" variant="outline">
          {t("common.actions.login")}
        </Button>
      </div>
    </div>
  );
}
