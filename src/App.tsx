import React, { useState } from 'react';
import { RoadmapModule } from './types';
import { generateRoadmap } from './services/api';
import Header from './components/Header';
import Footer from './components/Footer';
import TopicForm from './components/TopicForm';
import RoadmapGrid from './components/RoadmapGrid';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';

function App() {
  const [topic, setTopic] = useState<string>('');
  const [modules, setModules] = useState<RoadmapModule[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRoadmap = async (inputTopic: string) => {
    setTopic(inputTopic);
    setIsLoading(true);
    setError(null);

    try {
      const response = await generateRoadmap(inputTopic);
      setModules(response.roadmap || []);
    } catch (err) {
      setError('Failed to generate roadmap. Please try again later.');
      setModules([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (topic) {
      handleGenerateRoadmap(topic);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <main className="flex-1 px-4">
        <TopicForm onSubmit={handleGenerateRoadmap} isLoading={isLoading} />

        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={handleRetry} />
        ) : modules.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Your Learning Roadmap for <span className="bg-yellow-400 px-2">{topic}</span>
            </h2>
            <RoadmapGrid modules={modules} />
          </div>
        ) : (
          <div className="text-center my-16">
            <div className="inline-block border-4 border-black bg-blue-400 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0)]">
              <p className="text-xl">Enter a topic above to generate your learning roadmap</p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;