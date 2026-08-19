import React from 'react';

const variants = {
  primary: 'bg-[#4a7c59] text-white hover:opacity-90',
  outline: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50',
};

const Button = ({ variant = 'primary', className = '', children, ...props }) => (
  <button
    className={`py-3 px-6 rounded-xl font-semibold transition-all ${variants[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
