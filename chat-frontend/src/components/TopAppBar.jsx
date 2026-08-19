import React from 'react';
import { Link } from 'react-router-dom';
import NotificationBell from './NotificationBell';
import { LeafIcon } from './icons';

const TopAppBar = () => {
  return (
    <header className="font-terra sticky top-0 z-10 bg-white border-b border-gray-100 px-4 md:px-6 py-3 flex items-center justify-between">
      <Link to="/messages" className="flex items-center gap-2 text-xl font-bold text-[#2f4d38]">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#4a7c59] text-white">
          <LeafIcon className="w-5 h-5" />
        </span>
        Terra
      </Link>
      <NotificationBell />
    </header>
  );
};

export default TopAppBar;
