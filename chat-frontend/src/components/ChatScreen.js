import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/Chat.css';

const Chat = () => {
  const { recipient } = useParams();
  const [messages, setMessages] = useState([
    { id: 1, user: 'Alice', content: 'Hello Bob!', recipient: 'Bob' },
    { id: 2, user: 'Bob', content: 'Hi Alice!', recipient: 'Alice' },
    // Add more dummy messages as needed
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, user: 'DemoUser', content: newMessage, recipient }]);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat with {recipient}</h2>
      </div>
      <div className="chat-box">
        {messages
          .filter((message) => message.recipient === recipient)
          .map((message) => (
            <div key={message.id} className="chat-message">
              <strong className="chat-user">{message.user}:</strong> {message.content}
            </div>
          ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="chat-send-button" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
