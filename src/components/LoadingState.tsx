import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="my-12 flex flex-col items-center">
      <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0)] max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Generating Your Roadmap...</h2>
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full bg-black animate-bounce`}
              style={{ animationDelay: `${i * 0.15}s` }}
            ></div>
          ))}
        </div>
        <p className="mt-4 text-center">
          We're crafting a personalized learning pathway just for you. 
          This may take a moment.
        </p>
      </div>
    </div>
  );
};

export default LoadingState;