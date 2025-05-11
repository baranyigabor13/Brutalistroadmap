import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface TopicFormProps {
  onSubmit: (topic: string) => void;
  isLoading: boolean;
}

const TopicForm: React.FC<TopicFormProps> = ({ onSubmit, isLoading }) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit(topic.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-12">
      <div className="relative">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="What do you want to learn? (e.g., JavaScript, Machine Learning, Photography)"
          className="w-full px-6 py-4 text-lg border-4 border-black bg-white placeholder-gray-500 
                    focus:outline-none focus:ring-0 focus:border-blue-600 shadow-[6px_6px_0px_0px_rgba(0,0,0)]"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 border-2 border-black
                    ${
                      isLoading || !topic.trim()
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-yellow-400 hover:bg-yellow-500 cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0)]'
                    }`}
        >
          <Send size={24} />
        </button>
      </div>
    </form>
  );
};

export default TopicForm;