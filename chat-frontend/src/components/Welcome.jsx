import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-500 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to Messenger</h1>
      <p className="text-lg mb-8">Connect with your friends instantly.</p>
      <div>
        <Link to="/login" className="bg-white text-blue-500 px-4 py-2 rounded-full mr-4">Login</Link>
        <Link to="/signup" className="bg-white text-blue-500 px-4 py-2 rounded-full">Sign Up</Link>
      </div>
    </div>
  );
};

export default Welcome;
