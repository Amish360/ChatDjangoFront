import React from 'react';

const sizeClasses = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-20 h-20 text-2xl',
};

const Avatar = ({ name, size = 'md', className = '' }) => {
  const initials = name.slice(0, 2).toUpperCase();
  return (
    <div
      className={`rounded-full bg-[#4a7c59] text-white flex items-center justify-center font-bold shrink-0 ${sizeClasses[size]} ${className}`}
    >
      {initials}
    </div>
  );
};

export default Avatar;
