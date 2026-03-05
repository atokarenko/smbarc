"use client";

import {
  LayoutDashboard,
  ClipboardCheck,
  Map,
  ShieldAlert,
  TrendingUp,
  Boxes,
  Settings,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useSession } from "@/lib/auth-client";
import { RoleBadge } from "@/components/auth/role-badge";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const NAV_ITEMS = [
  { key: "dashboard", href: "/dashboard", icon: LayoutDashboard },
  { key: "scan", href: "/scan", icon: ClipboardCheck },
  { key: "roadmap", href: "/roadmap", icon: Map },
  { key: "risks", href: "/risks", icon: ShieldAlert },
  { key: "roi", href: "/roi", icon: TrendingUp },
  { key: "modules", href: "/modules", icon: Boxes },
  { key: "settings", href: "/settings", icon: Settings },
] as const;

export function AppSidebar() {
  const t = useTranslations();
  const pathname = usePathname();
  const { data: session } = useSession();

  const userName = session?.user?.name || "Demo User";
  const userRole = (session?.user as { role?: string } | undefined)?.role || "ceo";

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
            AI
          </div>
          <span className="font-semibold text-sm group-data-[collapsible=icon]:hidden">
            {t("common.appName")}
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/60">
            {t("common.navigation.dashboard")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={t(`common.navigation.${item.key}`)}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{t(`common.navigation.${item.key}`)}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="px-4 py-3">
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col gap-0.5 overflow-hidden group-data-[collapsible=icon]:hidden">
            <span className="truncate text-sm font-medium">{userName}</span>
            <RoleBadge role={userRole} />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
