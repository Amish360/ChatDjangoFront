import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Messages from './components/Messages';
import Chat from './components/ChatScreen';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
    <Router>
        <Routes>
          <Route exact path="/" element={<Messages />} />
          <Route path="/chat/:recipient" element={<Chat/>} />
        </Routes>
    </Router>
    </div>
  );
};

export default App;
