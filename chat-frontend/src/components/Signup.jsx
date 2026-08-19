import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';
import Card from './ui/Card';
import TextInput from './ui/TextInput';
import { LeafIcon } from './icons';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    // Add signup logic here
  };

  return (
    <div className="font-terra min-h-screen bg-[#fcfaf7] flex flex-col md:flex-row">
      <div className="relative overflow-hidden hidden md:flex md:w-1/2 bg-[#4a7c59] text-white flex-col items-center justify-center p-12 text-center">
        <LeafIcon className="absolute -z-10 -bottom-12 -left-12 w-72 h-72 text-white opacity-10 rotate-12" />
        <LeafIcon className="absolute -z-10 -top-10 -right-10 w-48 h-48 text-white opacity-10 -rotate-45" />
        <h1 className="text-4xl font-bold mb-4">Join Terra</h1>
        <p className="text-lg text-white/90 max-w-sm">
          Create a space for your close circle, at your own pace.
        </p>
      </div>

      <div className="relative overflow-hidden flex-1 flex flex-col justify-end md:justify-center md:items-center">
        <LeafIcon className="hidden md:block absolute -z-10 bottom-10 right-10 w-56 h-56 text-[#4a7c59] opacity-10 rotate-12" />
        <Card className="w-full md:max-w-md rounded-b-none md:rounded-3xl">
          <h2 className="text-3xl font-bold text-[#2f4d38] mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSignup}>
            <TextInput
              label="Email"
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
              label="Password"
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full mt-2">Sign Up</Button>
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
            Already have an account? <Link to="/login" className="text-[#4a7c59] font-semibold hover:underline">Login</Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
