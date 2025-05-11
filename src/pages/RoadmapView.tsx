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

interface ModuleCache {
  [key: string]: RoadmapModule[];
}

// Cache az útitervek tárolásához
const moduleCache: ModuleCache = {};

function RoadmapView() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [modules, setModules] = useState<RoadmapModule[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // URL szegmensek feldolgozása
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const originalTopic = decodeURIComponent(pathSegments[1] || '');
  const currentModuleTitle = pathSegments.length > 2 
    ? decodeURIComponent(pathSegments[pathSegments.length - 1]).replace(/-/g, ' ')
    : '';

  // Breadcrumb elemek generálása
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Főoldal', path: '/' },
    { label: originalTopic, path: `/roadmap/${encodeURIComponent(originalTopic)}` }
  ];

  // További breadcrumb elemek hozzáadása
  if (pathSegments.length > 2) {
    pathSegments.slice(2).forEach((segment, index) => {
      breadcrumbItems.push({
        label: decodeURIComponent(segment).replace(/-/g, ' '),
        path: `/roadmap/${pathSegments.slice(1, index + 3).join('/')}`
      });
    });
  }

  useEffect(() => {
    const fetchRoadmap = async () => {
      setIsLoading(true);
      setError(null);

      const cacheKey = `${originalTopic}-${currentModuleTitle || 'main'}`;

      // Ellenőrizzük, hogy van-e cache-elt adat
      if (moduleCache[cacheKey]) {
        setModules(moduleCache[cacheKey]);
        setIsLoading(false);
        return;
      }

      try {
        const response = await generateRoadmap(
          originalTopic,
          currentModuleTitle || undefined
        );

        // Cache-eljük az adatokat
        moduleCache[cacheKey] = response.roadmap;
        setModules(response.roadmap);
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
          onRetry={() => {
            // Cache törlése hiba esetén
            const cacheKey = `${originalTopic}-${currentModuleTitle || 'main'}`;
            delete moduleCache[cacheKey];
            navigate(0);
          }} 
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