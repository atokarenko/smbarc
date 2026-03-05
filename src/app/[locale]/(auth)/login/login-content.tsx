"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
import { DemoSelector } from "@/components/auth/demo-selector";
import { LocaleSwitcher } from "@/components/i18n/locale-switcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function LoginContent() {
  const t = useTranslations();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await authClient.signIn.email({ email, password });
      if (result.error) {
        setError(t("auth.error"));
        setLoading(false);
        return;
      }
      router.push("/dashboard");
    } catch {
      setError(t("auth.error"));
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="absolute right-4 top-4">
        <LocaleSwitcher />
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold">{t("auth.loginTitle")}</h1>
        <p className="text-muted-foreground mt-2">{t("auth.loginSubtitle")}</p>
      </div>

      <div className="w-full max-w-3xl">
        <DemoSelector />
      </div>

      <div className="w-full max-w-md">
        <Separator className="my-4" />
        <p className="text-muted-foreground mb-4 text-center text-sm">
          {t("auth.orLogin")}
        </p>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t("common.actions.login")}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder={t("auth.email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder={t("auth.password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <p className="text-destructive text-sm">{error}</p>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t("auth.signingIn") : t("common.actions.login")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
