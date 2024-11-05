import React from "react";

const Loading: React.FC = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='dots-container flex gap-2'>
        <div className='dot'></div>
        <div className='dot'></div>
        <div className='dot'></div>
        <div className='dot'></div>
        <div className='dot'></div>
      </div>
    </div>
  );
};

export default Loading;
