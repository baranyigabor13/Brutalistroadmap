import React from 'react';
import { RoadmapModule } from '../types';
import ModuleCard from './ModuleCard';

interface RoadmapGridProps {
  modules: RoadmapModule[];
}

const RoadmapGrid: React.FC<RoadmapGridProps> = ({ modules }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      {modules.map((module, index) => (
        <ModuleCard key={module.id} module={module} index={index} />
      ))}
    </div>
  );
};

export default RoadmapGrid;