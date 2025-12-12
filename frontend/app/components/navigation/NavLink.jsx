"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/Button/Button";

export default function NavLink({ href, label, icon, isActive }) {

  return (
    // Links template
    <Link
      href={href ? href : "/"}
      className="flex flex-col items-center justify-center w-full"
    >
      <Button
        type="icon"
        size="icon-md"
        iconSize="lg"
        variant="ghost"
        icon={icon}
        className={`${isActive ? "color-brand glass-btn" : "color-inverse hover:color-brand"} min-w-64! h-64 flex flex-col gap-2`}
        aria-label={label}
      >
        <span className="text-[10px] font-medium">{label}</span>

      </Button>
    </Link>
  );
}
