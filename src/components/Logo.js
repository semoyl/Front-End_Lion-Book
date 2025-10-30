import React from 'react';

function Logo({ className }) {
  return (
    <img 
      src="/logo.png" 
      alt="LionBook Logo" 
      className={className}
    />
  );
}

export default Logo;
