"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Sparkles,
  BookmarkIcon,
  ChartColumnBig,
  Users,
  Star,
  Settings,
  CircleQuestionMark,
  LogOut,
} from "lucide-react";
import { signOut } from "@/utils/auth";
import { Button } from "@/ui/Button/Button";

const MENU_ITEMS = [
  { icon: Sparkles, label: "Get Pro lineUp", href: "/pro" },
  { icon: BookmarkIcon, label: "Saved", href: "/saved" },
  { icon: ChartColumnBig, label: "Insights", href: "/insights" },
  { icon: Users, label: "Invite friends", href: "/invite" },
  { icon: Star, label: "Rate the app", href: "/rate" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: CircleQuestionMark, label: "Help", href: "/help" },
  { icon: LogOut, label: "Log out", href: "/logout", destructive: true },
];

export default function RightSideMenu() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  const handleItemClick = (item) => {
    if (item.href === "/logout") {
      handleLogout();
    } else {
      router.push(item.href);
    }
  };

  const isActive = (href) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <aside className="hidden lg:flex bottom-0 w-400 flex-col border-l border-base-300 bg-alt z-50 px-12 py-20">
      {/* Menu Title */}
      <div className="mb-32 px-12">
        <h2 className="text-h2 font-semibold">More</h2>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 space-y-4">
        {MENU_ITEMS.map((item, index) => {
          const Icon = item.icon;
          const isDestructive = item.destructive;

          return (
            <Button
              size="icon-sm"
              variant="secondary"
              icon={<Icon />}
              key={index}
              onClick={() => handleItemClick(item)}
              className={`flex bg-alt! items-center border-none! gap-16 px-12 py-12 rounded-lg transition-all duration-200 w-full text-left 
              ${isActive(item.href)
                  ? "bg-default font-semibold"
                  : "hover:bg-alt"
                } ${isDestructive ? "text-error hover:text-error" : ""}`}
            >
              <span
                className={`text-body ${isActive(item.href) && !isDestructive ? "font-semibold" : ""
                  }`}
              >
                {item.label}
              </span>
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
