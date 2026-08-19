import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';

const initialMessages = [
  { id: 1, user: 'Alice', content: 'Hello man!', recipient: 'Alice' },
  { id: 2, user: 'Bob', content: 'Hi User!', recipient: 'Bob' },
];

const ChatScreen = () => {
  const { recipient } = useParams();
  const { currentUser } = useAppData();
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, user: currentUser.name, content: newMessage, recipient },
      ]);
      setNewMessage('');
    }
  };

  const conversation = messages.filter((message) => message.recipient === recipient);

  return (
    <div className="font-terra flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
        <div className="font-bold text-[#2f4d38]">{recipient}</div>
        <div className="flex items-center gap-3 text-gray-400">
          <span title="Call">📞</span>
          <span title="Video call">📹</span>
          <span title="Profile">ℹ️</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {conversation.map((message) =>
          message.user === currentUser.name ? (
            <div key={message.id} className="flex justify-end">
              <div className="bg-[#4a7c59] text-white rounded-t-2xl rounded-bl-2xl px-4 py-2 max-w-xs">
                {message.content}
              </div>
            </div>
          ) : (
            <div key={message.id} className="flex justify-start">
              <div className="bg-[#f4f1ea] text-[#2e3230] rounded-t-2xl rounded-br-2xl px-4 py-2 max-w-xs">
                <strong className="block text-xs text-[#4a7c59] mb-1">{message.user}</strong>
                {message.content}
              </div>
            </div>
          )
        )}
      </div>

      <div className="mt-auto flex items-center gap-2 p-4 border-t border-gray-100 bg-white">
        <span className="text-gray-400" title="Attach">📎</span>
        <input
          type="text"
          className="flex-1 bg-[#f4f1ea] border-none rounded-full py-2 px-4 outline-none focus:ring-2 focus:ring-[#4a7c59]"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <span className="text-gray-400" title="Emoji">😊</span>
        <button
          className="bg-[#4a7c59] text-white px-4 py-2 rounded-full font-semibold"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
