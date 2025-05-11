import React from 'react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="my-12">
      <div className="border-4 border-black bg-red-400 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0)] max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-2">Oops! Something went wrong</h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={onRetry}
          className="bg-white border-4 border-black px-6 py-2 font-bold 
                   shadow-[4px_4px_0px_0px_rgba(0,0,0)]
                   hover:translate-y-1 hover:translate-x-1 hover:shadow-none
                   transition-all duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorState;