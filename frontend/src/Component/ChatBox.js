// ChatBox.js
import React, { useState } from 'react';
import Title from './Title';
import MessageList from './MessageList';
import InputMessage from './InputMessage';
const disabledStyle = {
    "pointer-events": 'none',
    "opacity": 0.5
};

function ChatBox({ owner, ownerAvatar, messages, isTyping, sendMessage, typing, resetTyping, loading }) {
    const [isLoading, setIsLoading] = useState(false);

    const sendMessageLoading = (sender, senderAvatar, message) => {
        setIsLoading(true);
        sendMessage(sender, senderAvatar, message);
        setTimeout(() => {
            setIsLoading(false);
        }, 400);
    };

    return (
        <div className="chatApp__conv" style={loading ? disabledStyle : {}}>
            <Title owner={owner} />
            <MessageList owner={owner} messages={messages} />
            <div className="chatApp__convSendMessage clearfix">
                <InputMessage
                    isLoading={isLoading}
                    owner={owner}
                    ownerAvatar={ownerAvatar}
                    sendMessage={sendMessage}
                    sendMessageLoading={sendMessageLoading}
                    typing={typing}
                    resetTyping={resetTyping}
                />
            </div>
        </div>
    );
}

export default ChatBox;
