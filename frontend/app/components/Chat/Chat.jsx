import React, { useCallback, useEffect, useRef, useState } from "react"
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { sendMessage } from "@/utils/api";
import Input from "@/ui/Input/Input";
import { Button } from '@/ui/Button/Button';
import { Mic, Plus } from "lucide-react";

function Message({ role, children }) {
    return (
        <div className={`message ${role}-message`}>
            <div className="message-content">
                {typeof children === 'string' ? (
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
                <Message key={index} role={msg.role}>
                    {msg.content}
                </Message>
            ))}
        </div>
    )
}

function ChatInput({ threadId }) {
    const [message, setMessage] = useState("");
    const formRef = useRef(null);

    const handleSend = useCallback(async (e) => {
        const trimmed = message.trim();
        if (!trimmed || !threadId) return;

        try {
            await sendMessage(threadId, { content: trimmed });
            setMessage("");
            if (formRef.current) {
                formRef.current.reset();
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }, [message, threadId]);

    return (
        
            <form
                ref={formRef}
                className="chat-input-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
            }}>
            <div className="flex justify-between items-center gap-8 w-full">
            <Button type="icon" icon={<Plus />} size="icon-md"/>
                <Input
                    className="p-10 bg-muted/40 border-0"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
            <Button type="icon" icon={<Mic/>} size="icon-md"/>
            </div>
            </form>
        
    )
}


export { Message, ChatMessages, ChatInput };