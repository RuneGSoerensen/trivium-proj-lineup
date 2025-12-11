'use client';
import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { Button } from '@/ui/Button/Button';

export function ChatThreadItem({ thread, isActive, onSelect }) {
    const {
        id,
        isGroup,
        participantName, // 1:1 chat
        participantAvatarUrl, // 1:1 chat
        participantNames, // group chat
        title, // group title
        lastMessagePreview,
        lastMessageAt,
    } = thread;

    // Derive secondary initial for group avatar from comma-separated names
    const nameList = typeof participantNames === "string"
        ? participantNames.split(",").map((s) => s.trim()).filter(Boolean)
        : [];
    const secondInitial = nameList[1]?.charAt(0).toUpperCase() ?? "?";

    const displayName = isGroup
        ? title || nameList.join(", ") || "Untitled Group Chat"
        : participantName || "Untitled chat";

    const preview = lastMessagePreview || "No messages yet";

    const timestamp = lastMessageAt
        ? new Date(lastMessageAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })
        : "";
    const fallbackInitial = participantName ? participantName.charAt(0).toUpperCase() : "";
    const fallbackInitialsGroup = isGroup && participantNames
        ? participantNames.split(",")[0]?.charAt(0).toUpperCase()
        : "";
    return (
        <Button
            variant='secondary'
            type="button"
            className={clsx(
                "chat-thread-item overflow-x-hidden w-full flex flex-col items-start gap-3 py-12 my-4 text-left border-0 border-b border-gray-200 rounded-none hover:bg-base-200 rounded-t-lg text-body focus:bg-base-200",
                isActive && "active"
            )}
            size='sm'
            onClick={() => onSelect(id)}
        >
            <div className='flex items-center w-full gap-20'>
                {/* Avatar: different based on chat type (1:1 or group) */}
                {isGroup ? (
                    <div className="relative rounded-full bg-default flex items-center justify-center overflow-hidden shrink-0">
                        <div className="absolute h-50 w-50 top-0 left-0 rounded-full bg-default border-2 border-white overflow-hidden">
                                <Image
                                    src={participantAvatarUrl ? participantAvatarUrl : fallbackInitialsGroup ? `https://ui-avatars.com/api/?name=${encodeURIComponent(participantNames)}&background=random&size=128` : "/default-avatar.png"}
                                    alt={participantNames || "Avatar"}
                                    className="object-cover"
                                    width={200}
                                    height={200}
                                />
                        </div>
                        <div className="absolute bottom-0 right-0 h-50 w-50 rounded-full bg-default border-2 border-white overflow-hidden">
                            <span className="text-xs font-semibold">
                                {secondInitial}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="avatar bg-default h-50 w-50 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                            <Image
                                src={participantAvatarUrl ? participantAvatarUrl : fallbackInitial ? `https://ui-avatars.com/api/?name=${encodeURIComponent(participantName)}&background=random&size=128` : "/default-avatar.png"}
                                alt={participantName || "Avatar"}
                                className="object-cover"
                                width={200}
                                height={200}
                            />
         
                    </div>
                )}

                <div className='flex-1 w-full'>
                    <div className='flex w-full items-center justify-between gap-2'>
                        <p className='truncate font-medium'>
                            {displayName}
                        </p>
                        {timestamp && (
                            <p className='text-sm color-muted whitespace-nowrap'>
                                {timestamp}
                            </p>
                        )}
                    </div>
                    <p className='mt-0.5 text-sm color-muted truncate'>
                        {preview}
                    </p>
                </div>
            </div>
        </Button>
    );
}

export default function ChatThreads({ threads, activeThreadId, onSelectThread }) {
    return (
        <div className="chat-threads overflow-y-auto gap-8 flex flex-col w-full">
            {threads.map((thread) => (
                <ChatThreadItem
                    key={thread.id}
                    thread={thread}
                    isActive={thread.id === activeThreadId}
                    onSelect={onSelectThread}
                />
            ))}
        </div>
    );
}