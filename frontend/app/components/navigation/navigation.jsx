"use client";

import { usePathname } from "next/navigation";
import NavLink from "./NavLink";

const links = [
  { href: "/", label: "Home", icon: "/icons/Home.svg" },
  { href: "/pages/services", label: "Services", icon: "/icons/Services.svg" },
  { href: "/pages/create", label: "Create", icon: "/icons/Create.svg" },
  { href: "/pages/chats", label: "Chats", icon: "/icons/Chat.svg" },
  { href: "/pages/profile", label: "Profile", icon: "/icons/Profile.svg" },
];

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    // Nav container
    // Remove Change color secondary darkgrey
    <nav className="fixed bottom-6 left-0 right-0 flex w-full justify-center">
      <div className="flex items-center w-[90%] justify-center bg-neutral-black rounded-pill">
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
