import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoadmapModule } from '../types';
import { generateRoadmap } from '../services/api';
import RoadmapGrid from '../components/RoadmapGrid';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import Breadcrumbs from '../components/Breadcrumbs';

interface BreadcrumbItem {
  label: string;
  path: string;
}

function RoadmapView() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [modules, setModules] = useState<RoadmapModule[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Parse path segments to get topic and module hierarchy
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const originalTopic = decodeURIComponent(pathSegments[1] || '');
  const currentModuleTitle = pathSegments.length > 2 
    ? decodeURIComponent(pathSegments[pathSegments.length - 1]).replace(/-/g, ' ')
    : '';

  // Generate breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Főoldal', path: '/' },
    { label: originalTopic, path: `/roadmap/${encodeURIComponent(originalTopic)}` },
    ...pathSegments.slice(2).map((segment, index) => ({
      label: decodeURIComponent(segment).replace(/-/g, ' '),
      path: `/roadmap/${pathSegments.slice(1, index + 3).join('/')}`
    }))
  ];

  useEffect(() => {
    const fetchRoadmap = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await generateRoadmap(
          originalTopic,
          currentModuleTitle || undefined
        );
        setModules(response.roadmap || []);
      } catch (err) {
        setError('Hiba történt az útiterv betöltése közben. Kérjük, próbálja újra később.');
      } finally {
        setIsLoading(false);
      }
    };

    if (originalTopic) {
      fetchRoadmap();
    }
  }, [originalTopic, currentModuleTitle]);

  const handleModuleClick = (module: RoadmapModule) => {
    const moduleSlug = encodeURIComponent(module.title.toLowerCase().replace(/\s+/g, '-'));
    navigate(`${location.pathname}/${moduleSlug}`);
  };

  if (!originalTopic) {
    navigate('/');
    return null;
  }

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />

      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState 
          message={error} 
          onRetry={() => navigate(0)} 
        />
      ) : (
        <div>
          {currentModuleTitle && (
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">
                <span className="bg-yellow-400 px-2">{currentModuleTitle}</span>
              </h2>
            </div>
          )}
          <RoadmapGrid 
            modules={modules} 
            onModuleClick={handleModuleClick}
          />
        </div>
      )}
    </div>
  );
}

export default RoadmapView;