"use client";
//NOTE - WORK IN PROGRESS - Navbar component to be expanded based on different types (search, title, chat, etc.)

import { useRouter } from "next/navigation";
import { Button } from "@/ui/Button/Button";
import { Search, Bell, Menu, ChevronLeftIcon } from "lucide-react";
import { useNavbar } from "@/utils/navbarContext";
import Image from "next/image";
import Link from "next/link";

const ACTION_DEFS = (router) => ({
  search: {
    icon: <Search className="w-4 h-4" />,
    ariaLabel: "Open search",
    onClick: () => router.push("/search"),
  },
  notifications: {
    icon: <Bell className="w-4 h-4" />,
    ariaLabel: "Open notifications",
    onClick: () => router.push("/notifications"),
  },
  menu: {
    icon: <Menu className="w-4 h-4" />,
    ariaLabel: "Open menu",
    onClick: () => router.push("/menu"),
  },
});

export default function Navbar() {
  const { config } = useNavbar();
  const router = useRouter();

  if (!config.visible) return null;

  const ACTIONS = ACTION_DEFS(router);

  // ... de forskellige type-cases (search, title, chat, osv.)

  // DEFAULT case:
  return (
    <nav
      className={`flex items-center justify-between w-full h-(--nav-height) px-16 py-8 ${config.backgroundColor} fixed top-0 left-0 right-0 z-50 lg:hidden`}
    >
      {config.showBack ? (
        <Button
          type="icon"
          variant="ghost"
          iconSize="xl"
          icon={<ChevronLeftIcon />}
          className="bg-transparent color-default"
          onClick={() => router.back()}
          aria-label="Back"
        />
      ) : config.showLogo ? (
        <Link href="/">
          <Image
            src="/images/lineup-type-logo.svg"
            alt="Lineup Logo"
            width={100}
            height={40}
          />
        </Link>
      ) : (
        <span className="w-24" />
      )}

      <div className="flex items-center gap-4">
        {config.actions.map((key) => {
          const action = ACTIONS[key];
          if (!action) return null;

          return (
            <Button
              key={key}
              type="icon"
              iconSize="lg"
              variant="ghost"
              className="color-default"
              aria-label={action.ariaLabel}
              onClick={action.onClick}
              icon={action.icon}
            />
          );
        })}
      </div>
    </nav>
  );
}
