import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './components/Welcome';
import Signup from './components/Signup';
import Login from './components/Login';
import Messages from './components/Messages';
import Friends from './components/Friends';
import Profile from './components/Profile';
import Feed from './components/Feed';
import ForgetPassword from './components/ForgetPassword';
import Layout from './components/Layout';
import { AppDataProvider } from './context/AppDataContext';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <AppDataProvider>
        <Router>
          <Routes>
            <Route  path="/" element={<Welcome />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route element={<Layout />}>
              <Route path="/messages" element={<Messages />} />
              <Route path="/messages/:recipient" element={<Messages />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/feed" element={<Feed />} />
            </Route>
          </Routes>
        </Router>
      </AppDataProvider>
    </div>
  );
};

export default App;
