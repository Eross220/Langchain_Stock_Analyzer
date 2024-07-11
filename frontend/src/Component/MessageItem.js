// MessageItem.js
import React from 'react';
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";


function MessageItem({ owner, sender, senderAvatar, message }) {
    const messagePosition = owner === sender ? 'chatApp__convMessageItem--right' : 'chatApp__convMessageItem--left';

    return (
        <div className={`chatApp__convMessageItem ${messagePosition} clearfix`}>
            <img src={senderAvatar} alt={sender} className="chatApp__convMessageAvatar" />
            <div className="chatApp__convMessageValue">
                <Markdown
                    remarkPlugins={[remarkGfm]}
                >
                    {message}
                </Markdown>
            </div>
        </div>
    );
}

export default MessageItem;
