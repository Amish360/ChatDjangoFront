import React from 'react';

const TextInput = ({ label, id, className = '', ...props }) => (
  <div className="mb-4 text-left">
    {label && (
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
    )}
    <input
      id={id}
      className={`bg-[#f4f1ea] border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-[#4a7c59] w-full ${className}`}
      {...props}
    />
  </div>
);

export default TextInput;
