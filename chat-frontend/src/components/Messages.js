import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Chat.css';

const dummyMessages = [
  { id: 1, user: 'Alice', content: 'Hello there!', recipient: 'Bob' },
  { id: 2, user: 'Bob', content: 'Hi Alice!', recipient: 'Alice' },
  { id: 3, user: 'Charlie', content: 'Hey everyone!', recipient: 'Alice' },
  // Add more dummy messages as needed
];

const Messages = () => {
  return (
    <div className="messages-container">
      <h2>Messages</h2>
      <div className="messages-list">
        {dummyMessages.map((message) => (
          <Link key={message.id} to={`/chat/${message.recipient}`} className="message-link">
            <div className="message-item">
              <strong>{message.user}:</strong> {message.content}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Messages;
