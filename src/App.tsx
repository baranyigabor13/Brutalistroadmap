import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainRoadmap from './pages/MainRoadmap';
import RoadmapView from './pages/RoadmapView';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        
        <main className="flex-1 px-4">
          <Routes>
            <Route path="/" element={<MainRoadmap />} />
            <Route path="/roadmap/*" element={<RoadmapView />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;