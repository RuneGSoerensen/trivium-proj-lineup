import React, { useCallback, useEffect, useRef, useState } from "react"
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { sendMessage } from "@/utils/api";
import Input from "@/ui/Input/Input";
import { Button } from '@/ui/Button/Button';
import { Mic, Plus } from "lucide-react";
import Image from "next/image";

function Message({ role, children, avatarUrl, authorName }) {
    const isOwn = role === 'user';
    const initials = authorName ? authorName.charAt(0).toUpperCase() : '';
    return (

            <div className={`message-row flex items-end gap-8 ${isOwn ? "justify-end" : "justify-start"}`}>
                {/* Incoming message: avatar on the left */}
                {!isOwn && (
                    <Image
                        alt={authorName || "Avatar"}
                        src={avatarUrl
                            ? avatarUrl
                            : initials
                                ? `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=random&size=128`
                                : "/default-avatar.png"}
                        width={20}
                        height={20}
                        className="rounded-full h-30 w-30 object-cover border bg-base-200 flex items-center justify-center overflow-hidden shrink-0"
                    />
                )}

            <div className={`message ${role}-message truncate`}>
                <div className="message-content">
                    {typeof children === "string" ? (
                        <ReactMarkdown
                            components={{
                                code({ node, inline, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || "");
                                    return !inline && match ? (
                                        <SyntaxHighlighter language={match[1]} PreTag="div" {...props}>
                                            {String(children).replace(/\n$/, "")}
                                        </SyntaxHighlighter>
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                }
                            }}>{children}
                        </ReactMarkdown>
                    ) : (children)}
                </div>
            </div>
                </div>

    )
}

function ChatMessages({ messages = [] }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        // On mount and whenever the message list length changes, scroll to bottom
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [messages]);
    // TODO optimize rendering for large message lists (e.g., react-window)
    // TODO add time, other persons styling + avatar, unreadmarker, etc.
    return (
        <div className="chat-messages">
            {messages.map((msg, index) => (
                <Message
                    key={msg.id ?? index}
                    role={msg.role}
                    avatarUrl={msg.avatarUrl}
                    authorName={msg.authorName}>
                    {msg.content}
                </Message>
            ))}
        </div>
    )
}

function ChatInput({ threadId, onMessageSent }) {
    const [message, setMessage] = useState("");
    const formRef = useRef(null);

    const handleSend = async () => {
        const trimmed = message.trim();
        if (!trimmed || !threadId) return;

        try {
            const result = await sendMessage(threadId, { content: trimmed });
            const newMessage = result.message ?? {
                content: trimmed,
                role: 'user',
            }

            onMessageSent?.(newMessage);

            setMessage("");
            if (formRef.current) {
                formRef.current.reset();
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (

        <div className="chat-input-form-container flex justify-between items-center gap-8 w-full">
            <Button type="icon" variant="glass" icon={<Plus />} size="icon-md" onClick={() => alert("Feature: Add media")} />
            <form
                ref={formRef}
                className="chat-input-form w-full"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                }}>
                <Input
                    className="p-10 glass w-full bg-muted/40 color-default border-0 ring-0 outline-0 focus:outline-0 focus:ring-0 focus:border-0 flex-1"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
            </form>
            <Button type="icon" variant="glass" icon={<Mic />} size="icon-md" onClick={() => alert("Feature: Voice input")} />
        </div>

    )
}


export { Message, ChatMessages, ChatInput };