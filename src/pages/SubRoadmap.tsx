import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoadmapModule, RoadmapNavigationState } from '../types';
import { generateRoadmap } from '../services/api';
import RoadmapGrid from '../components/RoadmapGrid';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { ArrowLeft } from 'lucide-react';

function SubRoadmap() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as RoadmapNavigationState;
  
  const [modules, setModules] = useState<RoadmapModule[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!state?.originalTopic || !state?.parentModule) {
      navigate('/');
      return;
    }

    const fetchSubRoadmap = async () => {
      try {
        const response = await generateRoadmap(state.originalTopic, state.parentModule);
        setModules(response.roadmap || []);
      } catch (err) {
        setError('Failed to generate sub-roadmap. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubRoadmap();
  }, [state, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  if (!state?.parentModule) {
    return null;
  }

  return (
    <div>
      <button
        onClick={handleBack}
        className="mb-6 flex items-center gap-2 bg-white border-4 border-black px-4 py-2 
                 shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:translate-x-1 hover:translate-y-1 
                 hover:shadow-none transition-all duration-200"
      >
        <ArrowLeft size={20} />
        Back to Main Roadmap
      </button>

      <h2 className="text-2xl font-bold mb-2 text-center">
        <span className="bg-yellow-400 px-2">{state.parentModule.title}</span>
      </h2>
      <p className="text-center mb-8 max-w-2xl mx-auto">
        {state.parentModule.description}
      </p>

      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState 
          message={error} 
          onRetry={() => navigate(0)} 
        />
      ) : (
        <RoadmapGrid modules={modules} />
      )}
    </div>
  );
}

export default SubRoadmap;