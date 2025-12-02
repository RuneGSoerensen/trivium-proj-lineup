'use client';
import { createContext, useContext, useState } from 'react';

const NavbarContext = createContext(null);

export function NavbarProvider({ children }) { 
    const [config, setConfig] = useState({
        type: "default",
        title: null,
        showBack: true,
        showLogo: false,
        actions:["search", "notifications", "menu"],
        visible: true,
        backgroundColor: "bg-default",
    });    

    return (
        <NavbarContext.Provider value={{ config, setConfig }}>
            {children}
        </NavbarContext.Provider>
    )
}

export function useNavbar() {
    const ctx = useContext(NavbarContext);
    if (!ctx) {
        throw new Error("useNavbar must be used inside <NavbarProvider>");
    }
    return ctx;
}