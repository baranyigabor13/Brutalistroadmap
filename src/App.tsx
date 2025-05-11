import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainRoadmap from './pages/MainRoadmap';
import SubRoadmap from './pages/SubRoadmap';
import Header from './components/Header';
import Footer from './components/Footer';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Header />
          
          <main className="flex-1 px-4">
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route 
                path="/" 
                element={
                  <PrivateRoute>
                    <MainRoadmap />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/roadmap/:topic/:moduleId" 
                element={
                  <PrivateRoute>
                    <SubRoadmap />
                  </PrivateRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;