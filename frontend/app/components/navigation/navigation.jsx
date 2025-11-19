"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="fixed bottom-6 left-0 right-0 flex justify-center">
      <div className="flex items-center justify-center gap-6 bg-[#1a1a1a] rounded-full px-8 py-4 border border-zinc-700">
        <Link
          href="/"
          className={`flex flex-col items-center gap-2 px-6 py-4 rounded-full transition-all ${
            isActive("/")
              ? "bg-zinc-800 text-[#FFCF70]"
              : "text-zinc-400 hover:text-[#FFCF70]"
          }`}
        >
          <Image
            src="/icons/Home.svg"
            alt="Home"
            width={24}
            height={24}
            style={
              isActive("/")
                ? {
                    filter:
                      "invert(1) sepia(1) saturate(1.5) hue-rotate(40deg)",
                  }
                : { filter: "invert(1)" }
            }
          />
          <span className="text-xs font-medium">Home</span>
        </Link>

        <Link
          href="/services"
          className={`flex flex-col items-center gap-2 px-6 py-4 rounded-full transition-all ${
            isActive("/services")
              ? "bg-zinc-800 text-[#FFCF70]"
              : "text-zinc-400 hover:text-[#FFCF70]"
          }`}
        >
          <Image
            src="/icons/Services.svg"
            alt="Services"
            width={24}
            height={24}
            style={
              isActive("/services")
                ? {
                    filter:
                      "invert(1) sepia(1) saturate(1.5) hue-rotate(40deg)",
                  }
                : { filter: "invert(1)" }
            }
          />
          <span className="text-xs font-medium">Services</span>
        </Link>

        <Link
          href="/create"
          className={`flex flex-col items-center gap-2 px-6 py-4 rounded-full transition-all ${
            isActive("/create")
              ? "bg-zinc-800 text-[#FFCF70]"
              : "text-zinc-400 hover:text-[#FFCF70]"
          }`}
        >
          <Image
            src="/icons/Create.svg"
            alt="Create"
            width={24}
            height={24}
            style={
              isActive("/create")
                ? {
                    filter:
                      "invert(1) sepia(1) saturate(1.5) hue-rotate(40deg)",
                  }
                : { filter: "invert(1)" }
            }
          />
          <span className="text-xs font-medium">Create</span>
        </Link>

        <Link
          href="/chats"
          className={`flex flex-col items-center gap-2 px-6 py-4 rounded-full transition-all ${
            isActive("/chats")
              ? "bg-zinc-800 text-[#FFCF70]"
              : "text-zinc-400 hover:text-[#FFCF70]"
          }`}
        >
          <Image
            src="/icons/Chat.svg"
            alt="Chat"
            width={24}
            height={24}
            style={
              isActive("/chats")
                ? {
                    filter:
                      "invert(1) sepia(1) saturate(1.5) hue-rotate(40deg)",
                  }
                : { filter: "invert(1)" }
            }
          />
          <span className="text-xs font-medium">Chats</span>
        </Link>

        <Link
          href="/profile"
          className={`flex flex-col items-center gap-2 px-6 py-4 rounded-full transition-all ${
            isActive("/profile")
              ? "bg-zinc-800 text-[#FFCF70]"
              : "text-zinc-400 hover:text-[#FFCF70]"
          }`}
        >
          <Image
            src="/icons/Profile.svg"
            alt="Profile"
            width={24}
            height={24}
            style={
              isActive("/profile")
                ? {
                    filter:
                      "invert(1) sepia(1) saturate(1.5) hue-rotate(40deg)",
                  }
                : { filter: "invert(1)" }
            }
          />
          <span className="text-xs font-medium">Profile</span>
        </Link>
      </div>
    </nav>
  );
}