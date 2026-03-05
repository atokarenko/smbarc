"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function toggleLocale() {
    const nextLocale = locale === "en" ? "ru" : "en";
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <Button variant="ghost" size="sm" onClick={toggleLocale}>
      {locale === "en" ? "RU" : "EN"}
    </Button>
  );
}
