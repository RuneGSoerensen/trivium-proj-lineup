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
  ChevronLeft,
  X,
  ChevronRight,
  PanelLeftOpen,
} from "lucide-react";
import { Button } from "@/ui/Button/Button";

export default function DesktopSidebar() {
  const [userId, setUserId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleOpenClose = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }



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
    <aside className={`hidden transition-all duration-200 lg:flex left-0 top-0 bottom-0 w-400 flex-col border-r border-base-300 bg-alt z-50 px-12 py-20 ${isOpen ? "w-400" : "w-fit"}`}>
      {/* Logo */}
      <div className={`${isOpen ? "justify-between" : "justify-center"} flex pb-12 items-center`}>

        {isOpen && (
          <Button
            variant="ghost"
            onClick="/">

            <Image
              src="/images/lineup-type-logo.svg"
              alt="Lineup Logo"
              width={120}
              height={48}
            />

          </Button>)}

        <Button
          type="icon"
          variant={isOpen ? "ghost" : "secondary"}
          size="icon-sm"
          iconSize="md"
          icon={isOpen ? <X className="cursor-pointer" /> : <PanelLeftOpen className="cursor-pointer" />}
          onClick={handleOpenClose}
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-16 px-12 py-12 rounded-lg color-default! transition-all duration-200 ${isOpen ? "w-full" : "w-fit"} ${isActive(link.href)
              ? "bg-brand-primary font-semibold"
              : "hover:bg-grey-300 color-default!"
              }`}
          >
            <span>
              {link.icon}
            </span>

            {isOpen && (
              <span
                className={`text-body transition-all duration-200 ${isActive(link.href) ? "font-semibold text-black" : "text-black"
                  }`}
              >
                {link.label}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
