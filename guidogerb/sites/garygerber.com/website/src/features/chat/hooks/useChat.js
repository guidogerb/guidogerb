// useChat.js
import { useState, useCallback } from 'react';
import { useChatStream } from './useChatStream';
import { chatApi } from '../services/chatApi';

export const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { startStream, stopStream } = useChatStream();

    const sendMessage = useCallback(async (content) => {
        try {
            setIsLoading(true);

            // Add user message to chat
            const userMessage = {
                id: Date.now(),
                content,
                type: 'user',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, userMessage]);

            // Start streaming AI response
            startStream({
                onMessage: (response) => {
                    setMessages(prev => [...prev, {
                        id: Date.now(),
                        content: response,
                        type: 'bot',
                        timestamp: new Date()
                    }]);
                },
                onError: (error) => {
                    console.error('Chat error:', error);
                },
                onComplete: () => {
                    setIsLoading(false);
                }
            });

            // Send message to backend
            await chatApi.sendMessage(content);

        } catch (error) {
            console.error('Failed to send message:', error);
            setIsLoading(false);
        }
    }, [startStream]);

    return {
        messages,
        sendMessage,
        isLoading
    };
};
