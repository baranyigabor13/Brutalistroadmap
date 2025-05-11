import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { RoadmapModule } from '../types';
import { generateRoadmap } from '../services/api';
import { getModuleById, getModulesByTopicId } from '../services/supabaseService';
import RoadmapGrid from '../components/RoadmapGrid';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { ArrowLeft } from 'lucide-react';
import { useRoadmapHistory } from '../context/RoadmapHistoryContext';

function SubRoadmap() {
  const { moduleId, topic: topicId } = useParams();
  const navigate = useNavigate();
  const { goBack, addToHistory } = useRoadmapHistory();
  
  const [currentModule, setCurrentModule] = useState<RoadmapModule | null>(null);
  const [modules, setModules] = useState<RoadmapModule[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!moduleId || !topicId) {
        navigate('/');
        return;
      }

      try {
        // Lekérjük az aktuális modult
        const module = await getModuleById(moduleId);
        setCurrentModule(module);

        // Lekérjük a gyerek modulokat
        const subModules = await getModulesByTopicId(topicId, moduleId);

        if (subModules.length === 0) {
          // Ha nincsenek gyerek modulok, generáljunk újakat
          const response = await generateRoadmap(module.title, module.description);
          setModules(response.roadmap);
          
          // Add to history
          addToHistory({
            topic: response.topic,
            modules: response.roadmap,
            parentModuleId: moduleId
          });
        } else {
          setModules(subModules);
        }
      } catch (err) {
        setError('Nem sikerült betölteni az al-útitervet. Kérjük, próbálja újra később.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [moduleId, topicId, navigate, addToHistory]);

  const handleBack = () => {
    const previousState = goBack();
    if (previousState) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  if (!currentModule) {
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
        Vissza a fő útitervhez
      </button>

      <h2 className="text-2xl font-bold mb-2 text-center">
        <span className="bg-yellow-400 px-2">{currentModule.title}</span>
      </h2>
      <p className="text-center mb-8 max-w-2xl mx-auto">
        {currentModule.description}
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