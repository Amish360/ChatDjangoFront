import React from 'react';

const Card = ({ className = '', children, ...props }) => (
  <div className={`bg-white p-8 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] ${className}`} {...props}>
    {children}
  </div>
);

export default Card;
