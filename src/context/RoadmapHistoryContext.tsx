import React, { createContext, useContext, useState } from 'react';
import { Topic, RoadmapModule } from '../types';

interface HistoryEntry {
  topic: Topic;
  modules: RoadmapModule[];
  parentModuleId?: string;
}

interface RoadmapHistoryContextType {
  history: HistoryEntry[];
  currentIndex: number;
  addToHistory: (entry: HistoryEntry) => void;
  goBack: () => HistoryEntry | undefined;
  clearHistory: () => void;
}

const RoadmapHistoryContext = createContext<RoadmapHistoryContextType | undefined>(undefined);

export const RoadmapHistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const addToHistory = (entry: HistoryEntry) => {
    // Ha nem az utolsó elemnél vagyunk, töröljük a későbbi elemeket
    const newHistory = history.slice(0, currentIndex + 1);
    setHistory([...newHistory, entry]);
    setCurrentIndex(newHistory.length);
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      return history[currentIndex - 1];
    }
    return undefined;
  };

  const clearHistory = () => {
    setHistory([]);
    setCurrentIndex(-1);
  };

  return (
    <RoadmapHistoryContext.Provider
      value={{
        history,
        currentIndex,
        addToHistory,
        goBack,
        clearHistory,
      }}
    >
      {children}
    </RoadmapHistoryContext.Provider>
  );
};

export const useRoadmapHistory = () => {
  const context = useContext(RoadmapHistoryContext);
  if (context === undefined) {
    throw new Error('useRoadmapHistory must be used within a RoadmapHistoryProvider');
  }
  return context;
};