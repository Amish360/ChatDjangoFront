import React from 'react';
import { NavLink } from 'react-router-dom';
import { MessagesIcon, FriendsIcon, ProfileIcon, FeedIcon } from './icons';

const items = [
  { to: '/feed', label: 'Feed', Icon: FeedIcon },
  { to: '/messages', label: 'Messages', Icon: MessagesIcon },
  { to: '/friends', label: 'Friends', Icon: FriendsIcon },
  { to: '/profile', label: 'Profile', Icon: ProfileIcon },
];

const BottomNavBar = () => {
  return (
    <nav className="font-terra flex md:hidden fixed bottom-0 inset-x-0 z-10 bg-white border-t border-gray-100">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-1 py-2 ${
              isActive ? 'text-[#4a7c59] font-semibold' : 'text-gray-500'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={`flex items-center justify-center w-9 h-9 rounded-full ${
                  isActive ? 'bg-[#4a7c59] text-white' : 'text-gray-500'
                }`}
              >
                <item.Icon className="w-5 h-5" />
              </span>
              <span className="text-xs">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNavBar;
