'use client';
import { Button } from '@ui/Button/Button';
import { Edit2, Search } from 'lucide-react';

export default function ChatLayout({ children }) {
    return (
        <section className="flex flex-col w-full h-full justify-between items-center pt-24 bg-brand-secondary">
            <div className='flex w-full justify-between py-8 px-16'>
                {/* 2 views: threads and messages
                    - threads: list of conversations, header: "Messages", search, new message button
                    - messages: selected conversation, header: "User" avatar and name, 'more' and back button
                 */}
                <h1 className='text-h1 text-on-secondary'>Messages</h1>
                <div className="flex gap-8">
                    <Button type="icon" iconSize='lg' icon={<Search />} />
                    <Button type="icon" iconSize='lg' icon={<Edit2 />} />
                </div>
            </div>
            <div className="w-full max-w-screen h-full bg-default text-default flex flex-col rounded-tabs">
                {children}
            </div>
        </section>
    )
}