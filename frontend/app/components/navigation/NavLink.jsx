"use client";

import Link from "next/link";
import Image from "next/image";

export default function NavLink({ href, label, icon, isActive }) {
  return (
    // Links template
    <Link
      href={href}
      className={`flex flex-col items-center gap-1 px-8 py-8 w-full rounded-full transition-all m-4 ${
        isActive
          ? "text-primary-crocus nav-link-gradient-border"
          : "text-zinc-400 hover:text-primary-crocus"
      }`}
    >
      <Image
        src={icon}
        alt={label}
        width={18}
        height={18}
        style={
          isActive
            ? {
                filter:
                  "invert(100%) sepia(1) saturate(1.5) hue-rotate(355deg) brightness(1.1)",
              }
            : { filter: "invert(1)" }
        }
      />
      <span className="text-[11px] font-medium">{label}</span>
    </Link>
  );
}
