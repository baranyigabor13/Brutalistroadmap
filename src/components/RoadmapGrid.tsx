import React from 'react';
import { RoadmapModule } from '../types';
import ModuleCard from './ModuleCard';

interface RoadmapGridProps {
  modules: RoadmapModule[];
  onModuleClick?: (module: RoadmapModule) => void;
}

const RoadmapGrid: React.FC<RoadmapGridProps> = ({ modules, onModuleClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      {modules.map((module, index) => (
        <ModuleCard 
          key={module.id} 
          module={module} 
          index={index}
          onClick={onModuleClick ? () => onModuleClick(module) : undefined}
        />
      ))}
    </div>
  );
};

export default RoadmapGrid;