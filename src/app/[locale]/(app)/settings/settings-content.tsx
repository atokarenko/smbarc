"use client";

import { useTranslations, useLocale } from "next-intl";
import { useSession } from "@/lib/auth-client";
import { useRouter, usePathname } from "@/i18n/navigation";
import { RoleBadge } from "@/components/auth/role-badge";
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

export function SettingsContent() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const userName = session?.user?.name || "Demo User";
  const userEmail = session?.user?.email || "";
  const userRole = (session?.user as { role?: string } | undefined)?.role || "ceo";

  function handleLocaleChange(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        {t("common.navigation.settings")}
      </h1>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("settings.profile")}</CardTitle>
          <CardDescription>{t("settings.profileDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-lg font-medium">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium">{userName}</p>
              <p className="text-sm text-muted-foreground">{userEmail}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Role Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("settings.role")}</CardTitle>
          <CardDescription>{t("settings.roleDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{t("settings.currentRole")}:</span>
            <RoleBadge role={userRole} label={t(`common.roles.${userRole}`)} />
          </div>
          <div className="mt-4">
            <Select defaultValue={userRole}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ceo">{t("common.roles.ceo")}</SelectItem>
                <SelectItem value="coo">{t("common.roles.coo")}</SelectItem>
                <SelectItem value="cto">{t("common.roles.cto")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Language Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("settings.language")}</CardTitle>
          <CardDescription>{t("settings.languageDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={locale} onValueChange={handleLocaleChange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ru">Russian</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
}
