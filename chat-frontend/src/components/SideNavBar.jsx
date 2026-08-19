import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from './ui/Button';
import { useAppData } from '../context/AppDataContext';
import { MessagesIcon, FriendsIcon, ProfileIcon, FeedIcon, LeafIcon } from './icons';

const navItems = [
  { to: '/feed', label: 'Feed', Icon: FeedIcon },
  { to: '/messages', label: 'Messages', Icon: MessagesIcon },
  { to: '/friends', label: 'Friends', Icon: FriendsIcon },
  { to: '/profile', label: 'Profile', Icon: ProfileIcon },
];

const SideNavBar = () => {
  const { openComposer } = useAppData();

  return (
    <aside className="relative overflow-hidden font-terra hidden md:flex md:flex-col md:w-56 md:shrink-0 md:min-h-screen border-r border-gray-100 bg-white p-4">
      <Button className="w-full mb-6" onClick={openComposer}>
        + Create Post
      </Button>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-xl font-medium ${
                isActive ? 'text-[#2f4d38]' : 'text-gray-500 hover:bg-[#f4f1ea]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex items-center justify-center w-9 h-9 rounded-full shrink-0 ${
                    isActive ? 'bg-[#4a7c59] text-white' : 'text-gray-400'
                  }`}
                >
                  <item.Icon className="w-5 h-5" />
                </span>
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <LeafIcon className="absolute -z-10 -bottom-6 -left-6 w-32 h-32 text-[#4a7c59] opacity-[0.06] -rotate-12" />
    </aside>
  );
};

export default SideNavBar;
