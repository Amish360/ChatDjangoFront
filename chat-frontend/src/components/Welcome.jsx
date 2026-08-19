import React from 'react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';
import Card from './ui/Card';
import { LeafIcon } from './icons';

const benefits = [
  { title: 'Organic Pace', description: 'Conversations that breathe, without the pressure to reply instantly.' },
  { title: 'Close Circles', description: 'Built for the people you actually talk to, not endless contact lists.' },
  { title: 'Calm Design', description: 'A quiet, uncluttered space designed to feel like coming home.' },
];

const Welcome = () => {
  return (
    <div className="font-terra min-h-screen bg-[#fcfaf7] flex flex-col">
      <div
        className="relative overflow-hidden flex-1 flex flex-col items-center justify-center text-center px-6 py-16 md:py-24"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(74,124,89,0.12), transparent 55%), radial-gradient(circle at 80% 30%, rgba(74,124,89,0.10), transparent 50%)',
        }}
      >
        <LeafIcon className="absolute -z-10 -top-8 -left-8 w-40 h-40 md:w-72 md:h-72 text-[#4a7c59] opacity-10 -rotate-12" />
        <LeafIcon className="absolute -z-10 -bottom-10 -right-8 w-32 h-32 md:w-64 md:h-64 text-[#4a7c59] opacity-10 rotate-45" />
        <h1 className="text-4xl md:text-6xl font-bold text-[#2f4d38] mb-4 max-w-2xl">
          Welcome to Terra
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-xl">
          Connect with your close circle, at your own pace.
        </p>
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-xs md:max-w-none md:w-auto">
          <Link to="/signup" className="w-full md:w-auto">
            <Button className="w-full">Sign Up</Button>
          </Link>
          <Link to="/login" className="w-full md:w-auto">
            <Button variant="outline" className="w-full">Log In</Button>
          </Link>
        </div>
      </div>

      <div className="px-6 pb-16 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="text-center">
              <h3 className="text-lg font-bold text-[#2f4d38] mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-700">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
