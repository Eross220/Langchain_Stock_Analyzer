// InputMessage.js
import React, { useRef } from 'react';

function InputMessage({ isLoading, owner, ownerAvatar, sendMessage, typing, resetTyping }) {
    const messageInput = useRef(null);
    const ownerInput = useRef(null);
    const ownerAvatarInput = useRef(null);

    const handleSendMessage = (event) => {
        event.preventDefault();
        if (messageInput.current.value.length > 0) {
            sendMessage(ownerInput.current.value, ownerAvatarInput.current.value, messageInput.current.value);
            messageInput.current.value = '';
        }
    };

    const handleTyping = () => {
        if (messageInput.current.value.length > 0) {
            typing(ownerInput.current.value);
        } else {
            resetTyping(ownerInput.current.value);
        }
    };

    const loadingClass = isLoading ? 'chatApp__convButton--loading' : '';
    const sendButtonIcon = <i className="material-icons">send</i>;

    return (
        <form onSubmit={handleSendMessage}>
            <input type="hidden" ref={ownerInput} value={owner} />
            <input type="hidden" ref={ownerAvatarInput} value={ownerAvatar} />
            <input
                type="text"
                ref={messageInput}
                className="chatApp__convInput"
                placeholder="Text message"
                onKeyDown={handleTyping}
                onKeyUp={handleTyping}
                tabIndex="0"
            />
            <div className={`chatApp__convButton ${loadingClass}`} onClick={handleSendMessage}>
                {sendButtonIcon}
            </div>
        </form>
    );
}

export default InputMessage;
