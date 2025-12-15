"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getUserId } from "@/utils/auth";
import {
  Home,
  Search,
  MessageCircleMore,
  Store,
  CirclePlus,
  UserCircle,
  Bell,
} from "lucide-react";

export default function DesktopSidebar() {
  const [userId, setUserId] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const setUserIdAsync = async () => {
      setUserId(await getUserId());
    };
    setUserIdAsync();
  }, []);

  const links = [
    { href: "/", label: "Home", icon: <Home className="w-6 h-6" /> },
    { href: "/search", label: "Search", icon: <Search className="w-6 h-6" /> },
    {
      href: "/chat",
      label: "Messages",
      icon: <MessageCircleMore className="w-6 h-6" />,
    },
    {
      href: "/notifications",
      label: "Notifications",
      icon: <Bell className="w-6 h-6" />,
    },
    {
      href: "/create",
      label: "Create",
      icon: <CirclePlus className="w-6 h-6" />,
    },
    {
      href: "/services",
      label: "Services",
      icon: <Store className="w-6 h-6" />,
    },
  ];

  if (userId) {
    links.push({
      href: `/profile/${userId}`,
      label: "Profile",
      icon: <UserCircle className="w-6 h-6" />,
    });
  }

  const isActive = (href) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <aside className="hidden lg:flex left-0 top-0 bottom-0 w-400 flex-col border-r border-base-300 bg-alt z-50 px-12 py-20">
      {/* Logo */}
      <div className="mb-32 px-12">
        <Link href="/">
          <Image
            src="/images/lineup-type-logo.svg"
            alt="Lineup Logo"
            width={120}
            height={48}
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-16 px-12 py-12 rounded-lg transition-all  duration-200  ${
              isActive(link.href)
                ? "bg-base-100 font-semibold  "
                : "hover:bg-base-200"
            }`}
          >
            <span
              className={isActive(link.href) ? "text-primary" : "text-black"}
            >
              {link.icon}
            </span>
            <span
              className={`text-body ${
                isActive(link.href) ? "font-semibold text-black" : "text-black"
              }`}
            >
              {link.label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
