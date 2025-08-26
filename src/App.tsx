import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LeadsPage from './pages/LeadsPage';
import PipelinePage from './pages/PipelinePage';
import AnalyticsPage from './pages/AnalyticsPage';
import { LeadsProvider } from './context/LeadsContext';

function App() {
  return (
    <LeadsProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/pipeline" element={<PipelinePage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Routes>
        </div>
      </Router>
    </LeadsProvider>
  );
}

export default App;