"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Settings, Code } from "lucide-react";

const DEMO_ROLES = [
  {
    role: "ceo" as const,
    icon: Briefcase,
    color: "text-blue-600 dark:text-blue-400",
    borderColor: "hover:border-blue-500",
    bgColor: "hover:bg-blue-50 dark:hover:bg-blue-950/30",
  },
  {
    role: "coo" as const,
    icon: Settings,
    color: "text-green-600 dark:text-green-400",
    borderColor: "hover:border-green-500",
    bgColor: "hover:bg-green-50 dark:hover:bg-green-950/30",
  },
  {
    role: "cto" as const,
    icon: Code,
    color: "text-purple-600 dark:text-purple-400",
    borderColor: "hover:border-purple-500",
    bgColor: "hover:bg-purple-50 dark:hover:bg-purple-950/30",
  },
] as const;

export function DemoSelector() {
  const t = useTranslations("demo");
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDemoLogin(role: "ceo" | "coo" | "cto") {
    setLoading(role);
    setError(null);

    const email = `demo-${role}@ai-architect.local`;
    const password = "demo-password-123";
    const name = t(`roles.${role}.title`);

    try {
      // Try sign-in first (user may already exist from previous demo)
      const signInResult = await authClient.signIn.email({
        email,
        password,
      });

      if (signInResult.error) {
        // If sign-in fails, sign up
        const signUpResult = await authClient.signUp.email({
          email,
          password,
          name,
        });

        if (signUpResult.error) {
          setError(signUpResult.error.message || "Demo login failed");
          setLoading(null);
          return;
        }
      }

      router.push("/dashboard");
    } catch (err) {
      setError(String(err));
      setLoading(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{t("title")}</h2>
        <p className="text-muted-foreground mt-1">{t("subtitle")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {DEMO_ROLES.map(({ role, icon: Icon, color, borderColor, bgColor }) => (
          <Card
            key={role}
            className={`cursor-pointer transition-all border-2 ${borderColor} ${bgColor} ${
              loading === role ? "opacity-70" : ""
            }`}
            onClick={() => !loading && handleDemoLogin(role)}
          >
            <CardHeader className="text-center pb-2">
              <div className={`mx-auto mb-2 ${color}`}>
                <Icon className="h-8 w-8" />
              </div>
              <CardTitle className="text-lg">{t(`roles.${role}.title`)}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-sm">
                {t(`roles.${role}.description`)}
              </CardDescription>
              <Button
                className="mt-4 w-full"
                variant="outline"
                disabled={loading !== null}
              >
                {loading === role ? t("entering") : t("viewResults")}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {error && (
        <p className="text-destructive text-center text-sm">{error}</p>
      )}
    </div>
  );
}
