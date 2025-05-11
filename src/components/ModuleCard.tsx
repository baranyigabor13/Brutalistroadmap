import React from 'react';
import { RoadmapModule } from '../types';
import { ChevronRight } from 'lucide-react';

interface ModuleCardProps {
  module: RoadmapModule;
  index: number;
  onClick?: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, index, onClick }) => {
  const colors = ['bg-yellow-400', 'bg-blue-500', 'bg-green-500', 'bg-pink-500', 'bg-purple-500'];
  const bgColor = colors[index % colors.length];

  return (
    <div
      onClick={onClick}
      className={`border-4 border-black ${bgColor} p-6 h-full shadow-[8px_8px_0px_0px_rgba(0,0,0)] 
                 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[8px_12px_0px_0px_rgba(0,0,0)]
                 ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex justify-between items-start">
        <div className="bg-white border-2 border-black p-3 mb-4 inline-block">
          <span className="text-xl font-bold">{index + 1}</span>
        </div>
        {onClick && (
          <ChevronRight size={24} className="mt-2" />
        )}
      </div>
      <h3 className="text-xl font-bold mb-2">{module.title}</h3>
      <p className="text-black">{module.description}</p>
    </div>
  );
};

export default ModuleCard;