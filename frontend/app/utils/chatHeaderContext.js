'use client';
import { createContext, useContext } from "react";

export const ChatHeaderContext = createContext({
    mode: "list",
    activeThread: null,
    onBack: null,
    setHeaderState: () => {},
});

export function useChatHeader() {
    return useContext(ChatHeaderContext);
}