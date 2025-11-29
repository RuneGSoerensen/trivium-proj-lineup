'use client';
import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';

    function ChatThreadItem({ thread, isActive, onSelect }) {
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

        const displayName = isGroup
            ? title || (participantNames?.join(", ") ?? "Untitled Group Chat")
            : participantName || "Untitled chat";

        const preview = lastMessagePreview || "No messages yet";

        const timestamp = lastMessageAt
            ? new Date(lastMessageAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })
            : "";
        const fallbackInitial = displayName.charAt(0).toUpperCase();
        return (
            <button
                type="button"
                className={clsx(
                    "chat-thread-item flex w-full items-center gap-3 px-3 py-2 text-left",
                    isActive && "active"
                )}
                onClick={() => onSelect(id)}
            >
                {/* Avatar: different based on chat type (1:1 or group) */}
                {isGroup ? (
                    <div className="relative h-10 w-10 rounded-full bg-brand-secondary flex items-center justify-center overflow-hidden shrink-0">
                        <div className="absolute top-0 left-0 h-6 w-6 rounded-full bg-default border-2 border-white overflow-hidden">
                            {participantAvatarUrl ? (
                                <Image
                                    src={participantAvatarUrl}
                                    alt={displayName}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="text-xs font-semibold">
                                    {fallbackInitial}
                                </span>
                            )}
                        </div>
                        <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-default border-2 border-white overflow-hidden">
                            <span className="text-xs font-semibold">
                                {participantNames && participantNames.length > 1
                                    ? participantNames[1].charAt(0).toUpperCase()
                                    : "?"}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="avatar h-10 w-10 rounded-full bg-brand-secondary flex items-center justify-center overflow-hidden shrink-0">
                        {participantAvatarUrl ? (
                            <Image
                                src={participantAvatarUrl}
                                alt={displayName}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <span className="text-sm font-semibold">
                                {fallbackInitial}
                            </span>
                        )}
                    </div>
                )}

                <div className='flex-1 min-w-0'>
                    <div className='flex items-center justify-between gap-2'>
                        <span className='truncate font-medium'>
                            {displayName}
                        </span>
                    </div>
                    {timestamp && (
                        <span className='text-xs text-muted whitespace-nowrap'>
                            {timestamp}
                        </span>
                    )}
                </div>
                <p className='mt-0.5 text-sm text-muted truncate'>
                    {lastMessagePreview || "No messages yet"}
                </p>
            </button>
        );
    }

    export default function ChatThreads({ threads, activeThreadId, onSelectThread }) {
        return (
            <div className="chat-threads">
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