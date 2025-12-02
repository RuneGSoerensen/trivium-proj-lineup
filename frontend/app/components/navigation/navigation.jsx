"use client";

import { usePathname } from "next/navigation";
import NavLink from "./NavLink";

const links = [
  { href: "/", label: "Home", icon: "/icons/Home.svg" },
  { href: "/services", label: "Services", icon: "/icons/Services.svg" },
  { href: "/create", label: "Create", icon: "/icons/Create.svg" },
  { href: "/chat", label: "Chats", icon: "/icons/Chat.svg" },
  { href: "/profile", label: "Profile", icon: "/icons/Profile.svg" },
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
    <nav className="fixed bottom-28 left-0 right-0 flex w-full justify-center">
      <div className="flex items-center w-fit justify-center bg-inverse rounded-pill">
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
