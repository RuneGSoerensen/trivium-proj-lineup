'use client';
import { createContext, useContext, useState } from 'react';

const NavbarContext = createContext(null);
const NavigationBottomContext = createContext(null);

export function NavbarProvider({ children }) { 
    const [config, setConfig] = useState({
        type: "default",
        title: null,
        showBack: true,
        showLogo: false,
        actions:["search", "notifications", "menu"],
        visible: true,
        backgroundColor: "none",
    });    

    return (
        <NavbarContext.Provider value={{ config, setConfig }}>
            {children}
        </NavbarContext.Provider>
    )
}

export function NavigationBottom({ children }) {
    const [bottomNavConfig, setBottomNavConfig] = useState({
        type: "default",
        visible: true,
    });    

    return (
        <NavigationBottomContext.Provider value={{ bottomNavConfig, setBottomNavConfig }}>
            {children}
        </NavigationBottomContext.Provider>
    );
}


export function useNavbar() {
    const ctx = useContext(NavbarContext);
    if (!ctx) {
        throw new Error("useNavbar must be used inside <NavbarProvider>");
    }
    return ctx;
}

export function useBottomNav() {
    const ctx = useContext(NavigationBottomContext);
    if (!ctx) {
        throw new Error("useBottomNav must be used inside <NavigationBottom>");
    }
    return ctx;
}