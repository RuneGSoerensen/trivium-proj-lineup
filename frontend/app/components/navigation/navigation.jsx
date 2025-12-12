"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import NavLink from "./NavLink";
import { useBottomNav } from "@/utils/navbarContext";
import { getUserId } from "@/utils/auth";
import { CirclePlus, Home, MessageCircleMore, Store, UserCircle } from "lucide-react";

export default function Navigation() {
  // Read userId only on the client after mount to avoid SSR/CSR hydration mismatch
  const [userId, setUserId] = useState(null);
  useEffect(() => {

    // NOTE: This is a workaround for getUserId being async now.
    const setUserIdAsync = async () => {
      setUserId(await getUserId());
    }
    setUserIdAsync();

  }, []);

  // Base links that are safe to render on the server
  const links = [
    { href: "/", label: "Home", icon: <Home /> },
    { href: "/services", label: "Services", icon: <Store /> },
    { href: "/create", label: "Create", icon: <CirclePlus /> },
    { href: "/chat", label: "Chats", icon: <MessageCircleMore /> },
  ];

  // Only add the profile link after we have a userId on the client
  if (userId) {
    links.push({
      href: `/profile/${userId}`,
      label: "Profile",
      icon: <UserCircle />,
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
      <div className="flex items-center justify-between rounded-pill trvm-glass-dark px-4 py-6 w-360">
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
