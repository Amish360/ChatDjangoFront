import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './components/Welcome';
import Signup from './components/Signup';
import Login from './components/Login';
import Messages from './components/Messages';
import Chat from './components/ChatScreen';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route  path="/" element={<Welcome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/chat/:recipient" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
