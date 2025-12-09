'use client';
import React, { useState } from 'react'
import Image from 'next/image';
import { Button } from '@/ui/Button/Button';
import { CheckCircle, PlusCircle } from 'lucide-react';

const User = ({ avatarUrl, userName, userTitle = 'User Title', connected = false }) => {
    // Local connection state - initialise from prop but control here
    const [isConnected, setIsConnected] = useState(connected);
    const initials = userName ? userName.charAt(0).toUpperCase() : '';
    const handleConnect = () => {
        // Hook to db later ?
        setIsConnected(true);
    };


    return (
        <div className="flex items-center justify-between w-full p-4">
            <div className="flex items-center w-full h-fit gap-8">
                <Image
                    alt={userName || "Avatar"}
                    src={avatarUrl
                        ? avatarUrl
                        : initials
                            ? `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random&size=128`
                            : "/default-avatar.png"}
                    width={20}
                    height={20}
                    className="rounded-full h-48 w-48 object-cover border bg-brand-primary flex items-center justify-center overflow-hidden shrink-0"
                />

                <div className="user-info ml-4">
                    <h2 className="text-base font-medium color-subtle">{userName}</h2>
                    <p className='text-sm color-subtle'>{userTitle}</p> {/* Placeholder until we figure out what to do */}
                </div>
            </div>

            {!isConnected ? (
                <Button
                    size="sm"
                    type="primary"
                    className="px-16! py-6! rounded-full flex items-center gap-4"
                    icon={<PlusCircle />}
                    iconPosition="right"
                    iconSize="sm"
                    onClick={handleConnect}
                >
                    Connect
                </Button>
            ) : (
                <div className="flex items-center gap-4 text-sm color-success">
                    <span>Connected</span>
                    <CheckCircle size={14}/>
                </div>
            )}
            
        </div>
    )
};

export default User