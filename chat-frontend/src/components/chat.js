// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/messages/');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async () => {
    try {
      await axios.post('http://localhost:8000/api/messages/', {
        user: 'DemoUser', // Replace with your user authentication logic
        content: newMessage,
      });
      setNewMessage('');
      fetchMessages(); // Refresh messages after sending a new one
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []); // Fetch messages when the component mounts

  return (
    <div>
      <div>
        <h2>Chat App</h2>
        <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
          {messages.map((message) => (
            <div key={message.id}>
              <strong>{message.user}:</strong> {message.content}
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
