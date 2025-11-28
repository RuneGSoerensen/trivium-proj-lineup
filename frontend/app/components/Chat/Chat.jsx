import React, { useCallback, useEffect, useRef } from "react"
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Button } from '@ui/Button/Button';

function Message({ role = "assistant", children }) {
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

function ChatInput({ resetSignal, onAddMessage }) {
    const formRef = useRef(null);
    const textareaRef = useRef(null);
    const isComposingRef = useRef(false);

    const handleLocalSubmit = useCallback((e) => {
        if (!onAddMessage) return;
        // Prevent default form submission
        e.preventDefault();
        const form = formRef.current ?? e.currentTarget;
        const formData = new FormData(form);
        const message = formData.get("message")?.toString().trim();

        if (message) {
            onAddMessage(message);
            // Clear textarea after submission
            form.reset();
            textareaRef.current?.focus();
        }

        if (!isComposingRef.current) {
            onAddMessage();
        }
    }, [onAddMessage]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (onAddMessage) {
                handleLocalSubmit(e);
            } else {
                // If no onAddMessage handler, submit the form normally
                formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            }
        };
    }, [handleLocalSubmit, onAddMessage]);
    useEffect(() => {
        if (resetSignal?.success && formRef.current) {
            formRef.current.reset();
            textareaRef.current?.focus();
        }
    }, [resetSignal]);

    const FormComponent = onAddMessage ? 'form' : Form;

    return (
        <div>
            <FormComponent ref={formRef} className="chat-input-form" onSubmit={handleLocalSubmit}>
                {/* <Button type="submit" aria-describedby={tooltipId} className="chat-input-submit-btn">Send</Button> */}
                <textarea
                    name="message"
                    ref={textareaRef}
                    className="chat-input-textarea"
                    placeholder="Type your message..."
                    onKeyDown={handleKeyDown}
                    onCompositionStart={() => { isComposingRef.current = true; }}
                    // Some IMEs fire compositionend before keyup; defer a tick to be safe
                    onCompositionEnd={() => { setTimeout(() => { isComposingRef.current = false; }, 0); }}
                    rows={1}
                />
            </FormComponent>
</div>
    )
}

export {Message, ChatMessages, ChatInput};