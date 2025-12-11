"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/Button/Button";
import {
  BookmarkIcon,
  ChartColumnBig,
  Circle,
  CircleQuestionMark,
  LogOut,
  Settings,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";
import { clearAuthData } from "@/utils/auth";
import { closeOverlay } from "@/utils/helpers";

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

export default function MenuOverlay() {
  const router = useRouter();
  const handleClose = () => closeOverlay(router);

  const handleLogout = () => {
    clearAuthData();
    router.push("/login");
  };

  return (
    <div
      className="fixed flex flex-col inset-0 bg-default z-50 p-12 gap-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-overlay"
    >
      <div className="flex items-center justify-between mb-12 w-full">
        <Button type="icon" iconSize="md" variant="ghost" icon={<X />} onClick={handleClose} />
        <h4 id="menu-overlay" className="text-h4 self-center">
          Menu
        </h4>
        <span />
      </div>
      <div className="flex flex-col space-y-24 items-start w-full">
        {MENU_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          const isDestructive = item.destructive;
          return (
            <Button
              key={idx}
              variant="ghost"
              icon={<Icon />}
              className="flex items-center justify-start px-10! text-left w-full hover:bg-transparent"
              onClick={
                item.href === "/logout"
                  ? handleLogout
                  : () => router.push(item.href)
              }
            >
              <h4
                className={`text-h4 font-normal! ${
                  isDestructive ? "color-destructive" : "color-default"
                }`}
              >
                {item.label}
              </h4>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
