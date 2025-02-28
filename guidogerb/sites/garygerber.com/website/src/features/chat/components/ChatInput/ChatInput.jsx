// ChatInput.jsx
import React, { useState } from 'react';
import Button from '../../../../shared/components/common/Button';
import SendIcon from '../../../../shared/components/Icons/SendIcon';
import './ChatInput.styles.js';

const ChatInput = ({ onSend, disabled }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSend(message);
            setMessage('');
        }
    };

    return (
        <form className="chat-input" onSubmit={handleSubmit}>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                disabled={disabled}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                    }
                }}
            />
            <Button
                type="submit"
                disabled={disabled || !message.trim()}
                icon={<SendIcon />}
            />
        </form>
    );
};

export default ChatInput;
