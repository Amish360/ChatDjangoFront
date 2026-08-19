import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import Button from './ui/Button';
import Card from './ui/Card';
import TextInput from './ui/TextInput';

const Friends = () => {
  const {
    users,
    friends,
    sentRequests,
    receivedRequests,
    sendFriendRequest,
    acceptRequest,
    declineRequest,
  } = useAppData();

  const [activeTab, setActiveTab] = useState('requests');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const pendingUserIds = sentRequests.map((r) => r.toUserId);

  const visibleUsers = users.filter((user) => {
    if (filter === 'active' && !user.active) return false;
    if (search && !user.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="font-terra min-h-full bg-[#fcfaf7]">
      <div className="flex md:hidden border-b border-gray-100 bg-white">
        <button
          onClick={() => setActiveTab('requests')}
          className={`flex-1 py-3 text-sm font-semibold ${
            activeTab === 'requests' ? 'text-[#4a7c59] border-b-2 border-[#4a7c59]' : 'text-gray-500'
          }`}
        >
          Requests
        </button>
        <button
          onClick={() => setActiveTab('friends')}
          className={`flex-1 py-3 text-sm font-semibold ${
            activeTab === 'friends' ? 'text-[#4a7c59] border-b-2 border-[#4a7c59]' : 'text-gray-500'
          }`}
        >
          All Friends
        </button>
      </div>

      <div className="md:flex md:gap-6 p-4 md:p-6">
        <aside className={`${activeTab === 'requests' ? 'block' : 'hidden'} md:block md:w-72 md:shrink-0 mb-6 md:mb-0`}>
          <Card>
            <h2 className="text-lg font-bold text-[#2f4d38] mb-4">Requests</h2>
            {receivedRequests.length === 0 ? (
              <p className="text-gray-500 text-sm">No pending friend requests.</p>
            ) : (
              <div className="space-y-3">
                {receivedRequests.map((request) => (
                  <div key={request.id} className="p-3 bg-[#f4f1ea] rounded-xl">
                    <div className="font-medium text-[#2f4d38] mb-2">{request.fromUserId}</div>
                    <div className="flex gap-2">
                      <Button onClick={() => acceptRequest(request.id)} className="flex-1">
                        Accept
                      </Button>
                      <Button variant="outline" onClick={() => declineRequest(request.id)} className="flex-1">
                        Decline
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </aside>

        <main className={`${activeTab === 'friends' ? 'block' : 'hidden'} md:block flex-1`}>
          <TextInput
            id="friend-search"
            placeholder="Search people..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                filter === 'all' ? 'bg-[#4a7c59] text-white' : 'bg-[#f4f1ea] text-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                filter === 'active' ? 'bg-[#4a7c59] text-white' : 'bg-[#f4f1ea] text-gray-700'
              }`}
            >
              Recently Active
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {visibleUsers.map((user) => {
              const isFriend = friends.includes(user.id);
              const isPending = pendingUserIds.includes(user.id);
              return (
                <Card key={user.id} className="text-center">
                  <div className="font-bold text-[#2f4d38]">{user.name}</div>
                  <div className="text-xs text-gray-400 mb-3">{user.active ? 'Active recently' : 'Offline'}</div>
                  {isFriend ? (
                    <Link
                      to={`/messages/${user.id}`}
                      className="block border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 py-3 px-6 rounded-xl text-sm font-semibold"
                    >
                      Message
                    </Link>
                  ) : (
                    <Button
                      onClick={() => sendFriendRequest(user.id)}
                      disabled={isPending}
                      className={`w-full ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isPending ? 'Pending' : 'Add Friend'}
                    </Button>
                  )}
                </Card>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Friends;
