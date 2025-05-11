import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainRoadmap from './pages/MainRoadmap';
import SubRoadmap from './pages/SubRoadmap';
import Header from './components/Header';
import Footer from './components/Footer';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Header />
          
          <main className="flex-1 px-4">
            <Routes>
              <Route path="/" element={<MainRoadmap />} />
              <Route path="/roadmap/:topic/:moduleId" element={<SubRoadmap />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;