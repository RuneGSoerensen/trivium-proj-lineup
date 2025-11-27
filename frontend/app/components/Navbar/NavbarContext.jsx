'use client';
import { createContext, useContext, useState } from 'react';

const NavbarContext = createContext();

export function NavbarProvider({ children }) { 
    const [config, setConfig] = useState({
        type: "default",
        title: null,
        showBack: false,
        actions:["search", "notifications", "menu"],
        visible:true,
    });    

    return (
        <NavbarContext.Provider value={{ config, setConfig }}>
            {children}
        </NavbarContext.Provider>
    )
}

export function useNavbar() { 
    return useContext(NavbarContext);
}