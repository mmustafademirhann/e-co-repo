import React from 'react';

const Spinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-4',
    lg: 'h-32 w-32 border-8',
  }[size] || 'h-12 w-12 border-4';

  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin rounded-full ${sizeClasses} border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent`}></div>
    </div>
  );
};

export default Spinner; 