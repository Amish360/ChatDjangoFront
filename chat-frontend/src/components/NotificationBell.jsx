import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';
import { formatRelativeTime } from '../utils/formatRelativeTime';
import Button from './ui/Button';

const chips = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
  { id: 'mentions', label: 'Mentions' },
  { id: 'system', label: 'System' },
];

const NotificationBell = () => {
  const {
    notifications,
    receivedRequests,
    markNotificationRead,
    markAllNotificationsRead,
    acceptRequest,
    declineRequest,
  } = useAppData();
  const [open, setOpen] = useState(false);
  const [chip, setChip] = useState('all');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = notifications.filter((n) => {
    if (chip === 'unread') return !n.read;
    if (chip === 'mentions') return n.category === 'mention';
    if (chip === 'system') return n.category === 'system';
    return true;
  });
  const newItems = filtered.filter((n) => !n.read);
  const earlierItems = filtered.filter((n) => n.read);

  const renderItem = (notification) => {
    const pendingRequest =
      notification.type === 'friend_request'
        ? receivedRequests.find((r) => r.fromUserId === notification.relatedUserId)
        : null;

    return (
      <div
        key={notification.id}
        onClick={() => markNotificationRead(notification.id)}
        className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-[#f4f1ea] ${
          notification.read ? 'bg-white' : 'bg-[#f4f1ea]'
        }`}
      >
        <p className="text-sm text-gray-700">{notification.message}</p>
        <p className="text-xs text-gray-400 mt-1">{formatRelativeTime(notification.createdAt)}</p>
        {pendingRequest && (
          <div className="flex gap-2 mt-3" onClick={(e) => e.stopPropagation()}>
            <Button onClick={() => acceptRequest(pendingRequest.id)} className="flex-1">
              Accept
            </Button>
            <Button variant="outline" onClick={() => declineRequest(pendingRequest.id)} className="flex-1">
              Decline
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="font-terra relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative bg-[#f4f1ea] text-[#2f4d38] px-3 py-2 rounded-full"
        aria-label="Notifications"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#4a7c59] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 bg-black/20 z-10 hidden md:block" onClick={() => setOpen(false)} />
          <div className="fixed inset-0 md:inset-auto md:top-0 md:right-0 md:h-full md:w-96 bg-white z-20 flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="font-bold text-[#2f4d38] text-lg">Notifications</span>
              <div className="flex items-center gap-3">
                <button onClick={markAllNotificationsRead} className="text-sm text-[#4a7c59] hover:underline">
                  Mark all as read
                </button>
                <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600" aria-label="Close">
                  ✕
                </button>
              </div>
            </div>

            <div className="flex gap-2 p-4 overflow-x-auto">
              {chips.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setChip(c.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap ${
                    chip === c.id ? 'bg-[#4a7c59] text-white' : 'bg-[#f4f1ea] text-gray-700'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center gap-2 h-full p-8 text-gray-400">
                  <span className="text-4xl">🌱</span>
                  <p className="font-medium">You're all caught up</p>
                  <p className="text-sm">Nothing to see here yet.</p>
                </div>
              ) : (
                <>
                  {newItems.length > 0 && (
                    <>
                      <p className="px-4 pt-3 pb-1 text-xs font-bold text-gray-400 uppercase">New</p>
                      {newItems.map(renderItem)}
                    </>
                  )}
                  {earlierItems.length > 0 && (
                    <>
                      <p className="px-4 pt-3 pb-1 text-xs font-bold text-gray-400 uppercase">Earlier</p>
                      {earlierItems.map(renderItem)}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;
