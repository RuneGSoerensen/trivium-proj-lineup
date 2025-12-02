"use client";
//NOTE - WORK IN PROGRESS - Navbar component to be expanded based on different types (search, title, chat, etc.)

import { useRouter } from "next/navigation";
import { Button } from "@/ui/Button/Button";
import { Search, Bell, Menu, ChevronLeftIcon } from "lucide-react";
import { NavbarProvider, useNavbar } from "@/utils/navbarContext";
import Image from "next/image";

const ACTION_DEFS = (router) => ({
    search: {
        icon: <Search className="w-4 h-4" />,
        ariaLabel: "Open search",
        onClick: () => router.push("/search"),
    },
    notifications: {
        icon: <Bell className="w-4 h-4" />,
        ariaLabel: "Open notifications",
        onClick: () => router.push("/notifications"),
    },
    menu: {
        icon: <Menu className="w-4 h-4" />,
        ariaLabel: "Open menu",
        onClick: () => router.push("/menu"),
    },
});

export function NavConfig() {
    const { config } = useNavbar();
    const router = useRouter();

    if (!config.visible) return null;

    const ACTIONS = ACTION_DEFS(router);

    // ... dine forskellige type-cases (search, title, chat, osv.)

    // DEFAULT case:
    return (
        <NavbarProvider value={{ config }}>
            <nav className="flex items-center justify-between w-full h-78 px-4 py-2 bg-base-100">
                {!config.showBack ? (
                    <Button icon={<ChevronLeftIcon stroke="var(--color-base-content)"/>} className="bg-default" onClick={() => router.back()} aria-label="Back" />
                ) : (
                        <Image
                            src="/images/lineup-type-logo.svg"
                            alt="Lineup Logo"
                            width={100}
                            height={40}
                        />
                )}

                <div className="flex items-center gap-3">
                    {config.actions.map((key) => {
                        const action = ACTIONS[key];
                        if (!action) return null;

                        return (
                            <Button
                                key={key}
                                type="icon"
                                variant="ghost"
                                aria-label={action.ariaLabel}
                                onClick={action.onClick}
                                icon={action.icon}
                            />
                        );
                    })}
                </div>
            </nav>
        </NavbarProvider>
    );
}

export default function Navbar() {
    return (
        <NavbarProvider>
            <NavConfig />
        </NavbarProvider>
  )
}