"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import NavLink from "./NavLink";
import { useBottomNav } from "@/utils/navbarContext";
import { getUserId } from "@/utils/auth";

export default function Navigation() {
  // Read userId only on the client after mount to avoid SSR/CSR hydration mismatch
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    setUserId(getUserId());
  }, []);

  // Base links that are safe to render on the server
  const links = [
    { href: "/", label: "Home", icon: "/icons/Home.svg" },
    { href: "/services", label: "Services", icon: "/icons/Services.svg" },
    { href: "/create", label: "Create", icon: "/icons/Create.svg" },
    { href: "/chat", label: "Chats", icon: "/icons/Chat.svg" },
  ];

  // Only add the profile link after we have a userId on the client
  if (userId) {
    links.push({
      href: `/profile/${userId}`,
      label: "Profile",
      icon: "/icons/Profile.svg",
    });
  }

  const pathname = usePathname();
  const { bottomNavConfig } = useBottomNav();
  if (!bottomNavConfig.visible) return null;

  const isActive = (href) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    // Nav container
    // Remove Change color secondary darkgrey
    <nav className="fixed bottom-28 left-0 right-0 flex w-full justify-center z-50">
      <div className="flex items-center w-fit justify-center rounded-pill trvm-glass-dark">
        {/* Mapped links */}
        {links.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            label={link.label}
            icon={link.icon}
            isActive={isActive(link.href)}
          />
        ))}
      </div>
    </nav>
  );
}
