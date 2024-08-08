import React from 'react';
import { Link } from 'react-router-dom';

const dummyMessages = [
  { id: 1, user: 'Alice', content: 'Hello there!', recipient: 'Bob' },
  { id: 2, user: 'Bob', content: 'Hi Alice!', recipient: 'Alice' },
  { id: 3, user: 'Charlie', content: 'Hey everyone!', recipient: 'Alice' },
  // Add more dummy messages as needed
];

const Messages = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Messages</h2>
        <div className="space-y-4">
          {dummyMessages.map((message) => (
            <Link key={message.id} to={`/chat/${message.recipient}`} className="block p-4 bg-gray-100 rounded-lg hover:bg-blue-50">
              <strong className="text-blue-500">{message.user}:</strong> {message.content}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;
