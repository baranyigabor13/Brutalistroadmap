import React from 'react';
import { Lightbulb } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-6 mb-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-center">
          <Lightbulb className="text-yellow-400 mr-2" size={32} />
          <h1 className="text-3xl md:text-4xl font-bold">Learning Roadmap Generator</h1>
        </div>
        <p className="text-center mt-4 max-w-2xl mx-auto">
          Enter a topic you'd like to learn, and we'll generate a 10-module roadmap to guide your journey.
        </p>
      </div>
    </header>
  );
};

export default Header;