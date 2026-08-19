import React, { createContext, useContext, useState, useCallback } from 'react';
import mockUsers from '../data/mockUsers';

const AppDataContext = createContext(null);

const currentUser = { id: 'Amish', name: 'Amish' };

let nextId = 1;
const makeId = (prefix) => `${prefix}-${nextId++}`;

export const AppDataProvider = ({ children }) => {
  const [friends, setFriends] = useState(['Alice', 'Bob']);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([
    { id: makeId('req'), fromUserId: 'Diana', status: 'pending' },
    { id: makeId('req'), fromUserId: 'Ethan', status: 'pending' },
  ]);
  const [notifications, setNotifications] = useState([
    {
      id: makeId('notif'),
      type: 'friend_request',
      category: 'social',
      message: 'Diana sent you a friend request.',
      relatedUserId: 'Diana',
      read: false,
      createdAt: Date.now(),
    },
    {
      id: makeId('notif'),
      type: 'friend_request',
      category: 'social',
      message: 'Ethan sent you a friend request.',
      relatedUserId: 'Ethan',
      read: false,
      createdAt: Date.now(),
    },
  ]);
  const [profile, setProfile] = useState({
    bio: 'Building calm, close-knit conversations.',
    email: 'amish@example.com',
    notificationsEnabled: true,
    profileVisible: true,
  });
  const [posts, setPosts] = useState([
    {
      id: makeId('post'),
      authorId: 'Alice',
      authorName: 'Alice',
      caption: 'Morning walk before the calls start. Trying to keep this pace all week.',
      imageUrl: null,
      createdAt: Date.now() - 2 * 60 * 60 * 1000,
      likedByMe: false,
      likeCount: 4,
      comments: [
        { id: makeId('comment'), authorName: 'Bob', text: 'Love this energy.', createdAt: Date.now() - 60 * 60 * 1000 },
        { id: makeId('comment'), authorName: 'Diana', text: 'Same, needed the reminder today.', createdAt: Date.now() - 40 * 60 * 1000 },
      ],
    },
    {
      id: makeId('post'),
      authorId: 'Bob',
      authorName: 'Bob',
      caption: 'Finally repotted the whole balcony garden. Feels good to slow down.',
      imageUrl: 'gradient',
      createdAt: Date.now() - 5 * 60 * 60 * 1000,
      likedByMe: false,
      likeCount: 9,
      comments: [],
    },
  ]);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const addNotification = useCallback((type, message, relatedUserId) => {
    setNotifications((prev) => [
      {
        id: makeId('notif'),
        type,
        category: 'social',
        message,
        relatedUserId,
        read: false,
        createdAt: Date.now(),
      },
      ...prev,
    ]);
  }, []);

  const updateProfile = useCallback((partial) => {
    setProfile((prev) => ({ ...prev, ...partial }));
  }, []);

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const openComposer = useCallback(() => setIsComposerOpen(true), []);
  const closeComposer = useCallback(() => setIsComposerOpen(false), []);

  const addPost = useCallback(({ caption, imageUrl }) => {
    setPosts((prev) => [
      {
        id: makeId('post'),
        authorId: currentUser.id,
        authorName: currentUser.name,
        caption,
        imageUrl: imageUrl || null,
        createdAt: Date.now(),
        likedByMe: false,
        likeCount: 0,
        comments: [],
      },
      ...prev,
    ]);
  }, []);

  const toggleLike = useCallback((postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              likedByMe: !post.likedByMe,
              likeCount: post.likedByMe ? post.likeCount - 1 : post.likeCount + 1,
            }
          : post
      )
    );
  }, []);

  const addComment = useCallback((postId, text) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                { id: makeId('comment'), authorName: currentUser.name, text, createdAt: Date.now() },
              ],
            }
          : post
      )
    );
  }, []);

  const sendFriendRequest = useCallback((userId) => {
    setSentRequests((prev) => [...prev, { id: makeId('req'), toUserId: userId, status: 'pending' }]);

    // No real backend to respond, so simulate the other side accepting after a short delay.
    setTimeout(() => {
      setSentRequests((prev) => prev.filter((r) => r.toUserId !== userId));
      setFriends((prev) => (prev.includes(userId) ? prev : [...prev, userId]));
      addNotification('friend_accepted', `${userId} accepted your friend request.`, userId);
    }, 3000);
  }, [addNotification]);

  const acceptRequest = useCallback((requestId) => {
    setReceivedRequests((prev) => {
      const request = prev.find((r) => r.id === requestId);
      if (request) {
        setFriends((f) => (f.includes(request.fromUserId) ? f : [...f, request.fromUserId]));
        addNotification('friend_accepted', `You are now friends with ${request.fromUserId}.`, request.fromUserId);
      }
      return prev.filter((r) => r.id !== requestId);
    });
  }, [addNotification]);

  const declineRequest = useCallback((requestId) => {
    setReceivedRequests((prev) => prev.filter((r) => r.id !== requestId));
  }, []);

  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const value = {
    currentUser,
    users: mockUsers.filter((u) => u.id !== currentUser.id),
    friends,
    sentRequests,
    receivedRequests,
    notifications,
    profile,
    posts,
    isComposerOpen,
    toast,
    sendFriendRequest,
    acceptRequest,
    declineRequest,
    markNotificationRead,
    markAllNotificationsRead,
    updateProfile,
    openComposer,
    closeComposer,
    addPost,
    toggleLike,
    addComment,
    showToast,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
};

export const useAppData = () => {
  const ctx = useContext(AppDataContext);
  if (!ctx) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return ctx;
};
