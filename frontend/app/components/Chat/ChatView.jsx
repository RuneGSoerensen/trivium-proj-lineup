
'use client';
import { fetchMessages, fetchThreads } from "@/utils/api";
import { ChevronLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ChatThreads from "./ChatThreads";
import { Button } from '@/ui/Button/Button';
import { ChatInput, ChatMessages } from "./Chat";
import { useChatHeader } from "@/utils/chatHeaderContext";


export default function ActiveChatView({ thread, messages, onBack }) {
    const { setHeaderState } = useChatHeader();
    useEffect(() => { 
        // Change header to 'active' mode
        setHeaderState(prev => ({
            ...prev,
            mode: 'active',
            activeThread: thread,
            onBack: onBack,
        }));

        // When unmounting, revert header to 'list' mode
        return () => {
            setHeaderState(prev => ({
                ...prev,
                mode: 'list',
                activeThread: null,
                onBack: null,
            }));
        };
    }, [thread, onBack, setHeaderState]);

    // const title =
    //     thread.title ||
    //     thread.participantName ||
    //     thread.participantNames?.join(", ") || "Chat";
    return (
        <div className="active-chat h-full w-full flex-1 flex flex-col">
            <ChatMessages messages={messages}/>
            <ChatInput threadId={thread.id}/>
        </div>
    );
}