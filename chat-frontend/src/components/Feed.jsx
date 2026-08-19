import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';
import { formatRelativeTime } from '../utils/formatRelativeTime';
import Avatar from './ui/Avatar';
import Card from './ui/Card';
import { HeartIcon, CommentIcon, ShareIcon, MoreIcon } from './icons';

const PostCard = ({ post }) => {
  const { currentUser, toggleLike, addComment, showToast } = useAppData();
  const [expanded, setExpanded] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [justLiked, setJustLiked] = useState(false);

  const handleLike = () => {
    toggleLike(post.id);
    if (!post.likedByMe) {
      setJustLiked(true);
      setTimeout(() => setJustLiked(false), 300);
    }
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      addComment(post.id, commentText.trim());
      setCommentText('');
    }
  };

  return (
    <Card className="rounded-3xl shadow-sm p-6 space-y-4 border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={post.authorName} />
          <div>
            <div className="font-bold text-[#2f4d38]">{post.authorName}</div>
            <div className="text-xs text-gray-400">{formatRelativeTime(post.createdAt)}</div>
          </div>
        </div>
        <button className="text-gray-400" title="More" aria-label="More options">
          <MoreIcon className="w-5 h-5" />
        </button>
      </div>

      {post.imageUrl === 'gradient' && (
        <div
          className="w-full h-56 rounded-2xl"
          style={{
            backgroundImage: 'linear-gradient(135deg, #cfe0d2, #4a7c59)',
          }}
        />
      )}
      {post.imageUrl && post.imageUrl !== 'gradient' && (
        <img src={post.imageUrl} alt="" className="w-full rounded-2xl max-h-96 object-cover" />
      )}

      {post.caption && <p className="text-gray-700">{post.caption}</p>}

      <div className="flex items-center gap-6 pt-2 border-t border-gray-100">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 ${post.likedByMe ? 'text-[#4a7c59]' : 'text-gray-500'}`}
        >
          <HeartIcon filled={post.likedByMe} className={`w-6 h-6 ${justLiked ? 'animate-like-pop' : ''}`} />
          <span className="text-sm">{post.likeCount}</span>
        </button>
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className={`flex items-center gap-2 ${expanded ? 'text-[#4a7c59]' : 'text-gray-500'}`}
        >
          <CommentIcon className="w-6 h-6" />
          <span className="text-sm">{post.comments.length}</span>
        </button>
        <button
          onClick={() => showToast('Post shared.')}
          className="flex items-center gap-2 text-gray-500"
        >
          <ShareIcon className="w-6 h-6" />
        </button>
      </div>

      {expanded && (
        <div className="pt-2 space-y-3">
          {post.comments.length === 0 ? (
            <p className="text-sm text-gray-400">No comments yet. Say something kind.</p>
          ) : (
            post.comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-2">
                <Avatar name={comment.authorName} size="sm" />
                <div>
                  <span className="text-sm font-semibold text-[#2f4d38] mr-2">{comment.authorName}</span>
                  <span className="text-sm text-gray-700">{comment.text}</span>
                </div>
              </div>
            ))
          )}
          <div className="flex items-center gap-2">
            <Avatar name={currentUser.name} size="sm" />
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 bg-[#f4f1ea] border-none rounded-full py-2 px-4 outline-none focus:ring-2 focus:ring-[#4a7c59] text-sm"
            />
            <button onClick={handleAddComment} className="text-sm font-semibold text-[#4a7c59]">
              Post
            </button>
          </div>
        </div>
      )}
    </Card>
  );
};

const Feed = () => {
  const { currentUser, posts, openComposer } = useAppData();

  return (
    <div className="font-terra min-h-full bg-[#fcfaf7] p-4 md:p-6">
      <div className="max-w-2xl mx-auto space-y-4 md:space-y-6">
        <Card
          onClick={openComposer}
          className="flex items-center gap-3 cursor-pointer hover:bg-[#f4f1ea] transition-colors"
        >
          <Avatar name={currentUser.name} />
          <span className="text-gray-400">What's on your mind?</span>
        </Card>

        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
