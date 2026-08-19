import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';
import Card from './ui/Card';
import TextInput from './ui/TextInput';
import { LeafIcon } from './icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <div className="relative overflow-hidden font-terra min-h-screen bg-[#fcfaf7] flex flex-col justify-end md:justify-center md:items-center">
      <LeafIcon className="hidden md:block absolute -z-10 top-10 left-10 w-56 h-56 text-[#4a7c59] opacity-10 -rotate-12" />
      <LeafIcon className="hidden md:block absolute -z-10 bottom-10 right-10 w-72 h-72 text-[#4a7c59] opacity-10 rotate-45" />
      <Card className="w-full md:max-w-md rounded-b-none md:rounded-3xl">
        <h2 className="text-3xl font-bold text-[#2f4d38] mb-6 text-center">Log In</h2>
        <form onSubmit={handleLogin}>
          <TextInput
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full mt-2">Log In</Button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-500">or continue with</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="flex flex-col gap-3">
          <Button variant="outline" className="w-full">Continue with Google</Button>
          <Button variant="outline" className="w-full">Continue with Apple</Button>
          <Button variant="outline" className="w-full">Continue with EcoID</Button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-700">
          Don't have an account? <Link to="/signup" className="text-[#4a7c59] font-semibold hover:underline">Sign Up</Link>
        </p>
        <p className="mt-2 text-center text-sm text-gray-700">
          Forgot your password? <Link to="/forget-password" className="text-[#4a7c59] font-semibold hover:underline">Reset Password</Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
