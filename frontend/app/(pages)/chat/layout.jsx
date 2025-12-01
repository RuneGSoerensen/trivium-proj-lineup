'use client';
import { Button } from '@/ui/Button/Button';
import { ChevronLeft, Edit2, MoreVertical, Search } from 'lucide-react';
import { ChatHeaderContext } from '@/utils/chatHeaderContext';
import { useState } from 'react';
import Image from 'next/image';

export default function ChatLayout({ children }) {
    const [headerState, setHeaderState] = useState({
        mode: 'list',
        activeThread: null,
        onBack: null,
    })

    const { mode, activeThread, onBack } = headerState;
    const participantInitials = activeThread?.participantName ? activeThread.participantName.charAt(0).toUpperCase() : '';

    return (
        <ChatHeaderContext.Provider value={{ ...headerState, setHeaderState }}>
            <section className="flex flex-col w-full h-full justify-between items-center pt-24 bg-brand-secondary">
                <div className='flex w-full justify-between py-8 px-16 items-center'>
                    {mode === 'list' ? (
                        <>
                            <h1 className='text-h1 text-on-secondary'>Messages</h1>
                            <div className="flex gap-8">
                                <Button type="icon" iconSize='lg' size='icon-md' icon={<Search />} />
                                <Button type="icon" iconSize='lg' size='icon-md' icon={<Edit2 />} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='flex items-center justify-between w-full mb-24'>
                                {/* Back button */}
                                <Button
                                    type="icon"
                                    iconSize="xl"
                                    size="icon-md"
                                    onClick={() => {
                                        if (onBack) onBack();
                                    }}
                                    icon={<ChevronLeft />}
                                />

                                <div className='flex w-full items-center justify-center gap-18'>
                                    <Image
                                        alt="Avatar"
                                        src={activeThread?.participantAvatarUrl || participantInitials ? `https://ui-avatars.com/api/?name=${encodeURIComponent(activeThread.participantName)}&background=random&size=128` : '/default-avatar.png'}
                                        width={50}
                                        height={50}
                                        className="rounded-full h-68 w-68 object-cover border bg-base-200 flex items-center justify-center overflow-hidden shrink-0"
                                    />
                                    {activeThread?.isGroup && (
                                        <span>
                                            {(activeThread?.title || "Chat").charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                    <span className="text-h2 text-on-secondary truncate">
                                        {activeThread?.title
                                            || activeThread?.participantName
                                            || (Array.isArray(activeThread?.participantNames)
                                                ? activeThread.participantNames.join(', ')
                                                : 'Chat')}
                                    </span>
                                </div>
                                {/* More button on the right */}
                                <div className="flex gap-8">
                                    <Button type="icon" size="icon-md" icon={<MoreVertical />} />
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="w-full max-w-screen h-full bg-default text-default flex flex-col rounded-tabs overflow-hidden">
                    {children}
                </div>
            </section>
        </ChatHeaderContext.Provider>
    )
}