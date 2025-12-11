
'use client';


import { useEffect } from "react";
import { ChatInput, ChatMessages } from "./Chat";
import { useChatHeader } from "@/utils/chatHeaderContext";
import { useBottomNav } from "@/utils/navbarContext";


export default function ActiveChatView({ thread, messages, onBack, onMessageSent }) {
    const { setBottomNavConfig } = useBottomNav();
    const { setHeaderState } = useChatHeader();
    useEffect(() => {
        // Change header to 'active' mode
        setHeaderState(prev => ({
            ...prev,
            mode: 'active',
            activeThread: thread,
            onBack: onBack,
        }));

        // Hide bottom nav when in active chat
        setBottomNavConfig(prev => ({
            ...prev,
            visible: false,
        }));

        // When unmounting, revert header to 'list' mode
        return () => {
            setHeaderState(prev => ({
                ...prev,
                mode: 'list',
                activeThread: null,
                onBack: null,
            }));

            // Show bottom nav again when exiting active chat
            setBottomNavConfig(prev => ({
                ...prev,
                visible: true,
            }));
        };
    }, [thread, onBack, setHeaderState, setBottomNavConfig]);


    // const title =
    //     thread.title ||
    //     thread.participantName ||
    //     thread.participantNames?.join(", ") || "Chat";
    return (
        <div className="active-chat h-full w-full flex-1 flex flex-col">
            <ChatMessages messages={messages} />
            <ChatInput threadId={thread.id} onMessageSent={onMessageSent} />
        </div>
    );
}