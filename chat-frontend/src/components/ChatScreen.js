import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const { recipient } = useParams();
  const [messages, setMessages] = useState([
    { id: 1, user: 'Alice', content: 'Hello man!', recipient: 'Alice' },
    { id: 2, user: 'Bob', content: 'Hi User!', recipient: 'Bob' },
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="text-2xl font-bold text-blue-500 mb-4">Chat with {recipient}</div>
        <div className="chat-box space-y-4 overflow-y-auto mb-4 max-h-80">
          {messages
            .filter((message) => message.recipient === recipient)
            .map((message) => (
              <div key={message.id} className="p-4 bg-gray-100 rounded-lg">
                <strong className="text-blue-500">{message.user}:</strong> {message.content}
              </div>
            ))}
        </div>
        <div className="flex">
          <input
            type="text"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
