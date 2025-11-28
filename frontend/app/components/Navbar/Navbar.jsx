"use client";
//NOTE - WORK IN PROGRESS - Navbar component to be expanded based on different types (search, title, chat, etc.)

import { useNavbar } from "./NavbarContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button/Button";
import { Search, Bell, Menu } from "lucide-react";

const ACTION_DEFS = (router) => ({
    search: {
        icon: <Search className="w-4 h-4" />,
        ariaLabel: "Open search",
        onClick: () => router.push("/pages/search"),
    },
    notifications: {
        icon: <Bell className="w-4 h-4" />,
        ariaLabel: "Open notifications",
        onClick: () => router.push("/pages/notifications"),
    },
    menu: {
        icon: <Menu className="w-4 h-4" />,
        ariaLabel: "Open menu",
        onClick: () => router.push("/pages/menu"),
    },
});

export default function Navbar() {
    const { config } = useNavbar();
    const router = useRouter();

    if (!config.visible) return null;

    const ACTIONS = ACTION_DEFS(router);

    // ... dine forskellige type-cases (search, title, chat, osv.)

    // DEFAULT case:
    return (
        <nav className="flex items-center justify-between px-4 py-2 bg-base-100">
            {config.showBack ? (
                <button onClick={() => router.back()} aria-label="Back">
                    {/* back icon */}
                </button>
            ) : (
                <div className="w-6" />
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
                            leftIcon={action.icon}
                        />
                    );
                })}
            </div>
        </nav>
    );
}