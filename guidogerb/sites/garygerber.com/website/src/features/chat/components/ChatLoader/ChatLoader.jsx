// src/features/chat/components/ChatLoader/ChatLoader.jsx
import React from 'react';
import './ChatLoader.styles.js';

const ChatLoader = () => {
    return (
        <div className="chat-loader">
            <div className="chat-loader-bubble">
                <div className="dot-typing">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
            </div>
        </div>
    );
};

export default ChatLoader;
