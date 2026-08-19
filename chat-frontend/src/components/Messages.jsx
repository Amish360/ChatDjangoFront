import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ChatScreen from './ChatScreen';

const dummyMessages = [
  { id: 1, user: 'Alice', content: 'Hello there!', recipient: 'Bob', unread: true, minutesAgo: 5 },
  { id: 2, user: 'Bob', content: 'Hi Alice!', recipient: 'Alice', unread: false, minutesAgo: 40 },
  { id: 3, user: 'Charlie', content: 'Hey everyone!', recipient: 'Alice', unread: true, minutesAgo: 120 },
];

const formatRelativeTime = (minutesAgo) => {
  if (minutesAgo < 60) return `${minutesAgo}m ago`;
  const hours = Math.floor(minutesAgo / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

const Messages = () => {
  const { recipient } = useParams();
  const [search, setSearch] = useState('');

  const filtered = dummyMessages.filter(
    (message) =>
      message.user.toLowerCase().includes(search.toLowerCase()) ||
      message.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="font-terra flex h-full">
      <div
        className={`${
          recipient ? 'hidden md:flex' : 'flex'
        } w-full md:w-80 md:shrink-0 md:border-r md:border-gray-100 flex-col bg-white`}
      >
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#2f4d38] mb-3">Messages</h2>
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#f4f1ea] border-none rounded-xl py-2 px-4 outline-none focus:ring-2 focus:ring-[#4a7c59]"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map((message) => (
            <Link
              key={message.id}
              to={`/messages/${message.recipient}`}
              className={`flex items-start gap-3 p-4 border-b border-gray-50 hover:bg-[#f4f1ea] ${
                recipient === message.recipient ? 'bg-[#f4f1ea]' : ''
              }`}
            >
              <span
                className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${
                  message.unread ? 'bg-[#4a7c59]' : 'bg-transparent'
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <strong className="text-[#2f4d38] truncate">{message.user}</strong>
                  <span className="text-xs text-gray-400 shrink-0 ml-2">
                    {formatRelativeTime(message.minutesAgo)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">{message.content}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={`${recipient ? 'flex' : 'hidden md:flex'} flex-1 flex-col`}>
        {recipient ? (
          <ChatScreen />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a conversation to start chatting.
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
