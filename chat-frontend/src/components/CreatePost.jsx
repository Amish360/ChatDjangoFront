import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import Button from './ui/Button';
import Card from './ui/Card';
import { PhotoIcon } from './icons';

const CreatePost = () => {
  const navigate = useNavigate();
  const { isComposerOpen, closeComposer, addPost, showToast } = useAppData();
  const [caption, setCaption] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  if (!isComposerOpen) return null;

  const reset = () => {
    setCaption('');
    setImagePreview(null);
  };

  const handleClose = () => {
    reset();
    closeComposer();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePost = () => {
    if (!caption.trim() && !imagePreview) return;
    addPost({ caption: caption.trim(), imageUrl: imagePreview });
    reset();
    closeComposer();
    showToast('Post shared to your feed.');
    navigate('/feed');
  };

  return (
    <div className="font-terra fixed inset-0 z-30 flex flex-col justify-end md:items-center md:justify-center">
      <div className="fixed inset-0 bg-black/20" onClick={handleClose} />
      <Card className="relative w-full md:max-w-lg rounded-b-none md:rounded-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <button onClick={handleClose} className="text-gray-500 md:hidden">Cancel</button>
          <h2 className="text-lg font-bold text-[#2f4d38]">Create Post</h2>
          <button onClick={handleClose} className="hidden md:block text-gray-400 hover:text-gray-600" aria-label="Close">
            ✕
          </button>
          <Button onClick={handlePost} className="md:hidden py-2 px-4 text-sm">Post</Button>
        </div>

        <textarea
          rows={4}
          placeholder="What's on your mind?"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full bg-[#f4f1ea] border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-[#4a7c59] mb-4"
        />

        {imagePreview ? (
          <div className="relative mb-4">
            <img src={imagePreview} alt="Selected upload preview" className="w-full rounded-2xl max-h-64 object-cover" />
            <button
              onClick={() => setImagePreview(null)}
              className="absolute top-2 right-2 bg-white/90 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center"
              aria-label="Remove photo"
            >
              ✕
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-2xl py-8 mb-4 text-gray-400 cursor-pointer hover:border-[#a9c9ae] hover:bg-[#f4f1ea] transition-colors">
            <PhotoIcon className="w-8 h-8" />
            <span className="text-sm font-medium">Add Photo</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        )}

        <Button onClick={handlePost} className="hidden md:block w-full">Post</Button>
      </Card>
    </div>
  );
};

export default CreatePost;
