"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/Button/Button";

export default function NavLink({ href, label, icon, isActive }) {

  return (
    // Links template
    <Link
      href={href ? href : "/"}
    >
      <Button
        type="icon"
        size="icon-md"
        iconSize="lg"
        variant="ghost"
        icon={icon}
        className={`${isActive ? "color-brand nav-link-active" : "color-inverse hover:color-brand"} w-64 h-64 flex flex-col gap-2`}
        aria-label={label}
      >
        <span className="text-[10px] font-medium">{label}</span>

      </Button>
    </Link>
  );
}
