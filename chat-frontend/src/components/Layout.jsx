import React from 'react';
import { Outlet } from 'react-router-dom';
import TopAppBar from './TopAppBar';
import SideNavBar from './SideNavBar';
import BottomNavBar from './BottomNavBar';
import CreatePost from './CreatePost';
import { useAppData } from '../context/AppDataContext';

const Layout = () => {
  const { toast } = useAppData();

  return (
    <div className="font-terra min-h-screen bg-[#fcfaf7] md:flex">
      <SideNavBar />
      <div className="flex-1 flex flex-col min-h-screen">
        <TopAppBar />
        <main className="flex-1 pb-16 md:pb-0">
          <Outlet />
        </main>
      </div>
      <BottomNavBar />
      <CreatePost />
      {toast && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 bg-[#2f4d38] text-white px-4 py-2 rounded-full shadow-lg z-40 text-sm">
          {toast}
        </div>
      )}
    </div>
  );
};

export default Layout;
