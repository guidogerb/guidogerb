// src/features/chat/components/ChatLoader/ChatLoader.styles.js
import { css } from '@emotion/css';

export const styles = {
    chatLoader: css`
        padding: 12px 24px;
        display: flex;
        align-items: flex-start;
    `,

    chatLoaderBubble: css`
        background-color: #f0f0f0;
        border-radius: 18px;
        padding: 12px 24px;
        display: inline-block;
        max-width: 80%;
    `,

    dotTyping: css`
        display: flex;
        gap: 4px;
        align-items: center;
        
        .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #666;
            animation: dotTyping 1.5s infinite ease-in-out;
            
            &:nth-of-type(2) {
                animation-delay: 0.2s;
            }
            
            &:nth-of-type(3) {
                animation-delay: 0.4s;
            }
        }
        
        @keyframes dotTyping {
            0% {
                transform: scale(1);
                opacity: 0.4;
            }
            20% {
                transform: scale(1.4);
                opacity: 1;
            }
            40% {
                transform: scale(1);
                opacity: 0.4;
            }
            100% {
                transform: scale(1);
                opacity: 0.4;
            }
        }
    `
};

export default styles;
