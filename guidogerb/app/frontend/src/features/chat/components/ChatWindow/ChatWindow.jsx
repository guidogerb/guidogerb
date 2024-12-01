// ChatWindow.jsx
import React, { useEffect, useRef } from 'react';
import { useChat } from '../../hooks/useChat';
import ChatMessage from '../ChatMessage';
import ChatInput from '../ChatInput';
import ChatLoader from '../ChatLoader';
import './ChatWindow.styles.js';

const ChatWindow = () => {
    const { messages, sendMessage, isLoading } = useChat();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="chat-window">
            <div className="messages-container">
                {messages.map((message) => (
                    <ChatMessage
                        key={message.id}
                        message={message}
                    />
                ))}
                {isLoading && <ChatLoader />}
                <div ref={messagesEndRef} />
            </div>
            <ChatInput
                onSend={sendMessage}
                disabled={isLoading}
            />
        </div>
    );
};

export default ChatWindow;
