import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './utils/supabaseClient';
import Header from './components/Header';
import SplashScreen from './components/SplashScreen';
import CampDashboard from './components/CampDashboard';
import WorkerRegistration from './components/WorkerRegistration';
import MedicalScreening from './components/MedicalScreening';
import FollowUpTracking from './components/FollowUpTracking';
import SearchWorker from './components/SearchWorker';
import Reports from './components/Reports';
import Scanner from './components/Scanner';
import DoctorDirectory from './components/DoctorDirectory';
import WorkerDashboard from './components/WorkerDashboard';
import { LanguageProvider } from './contexts/LanguageContext';
import './index.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) setRole(localStorage.getItem('userRole'));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) setRole(localStorage.getItem('userRole'));
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <LanguageProvider>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      
      {!showSplash && (
        <div className="app-container">
          <Header role={role} />
          
          <main>
            <Routes>
              <Route path="/" element={<CampDashboard />} />
              <Route path="/worker" element={<WorkerDashboard />} />
              <Route path="/register" element={<WorkerRegistration />} />
              <Route path="/screening" element={<MedicalScreening />} />
              <Route path="/follow-ups" element={<FollowUpTracking />} />
              <Route path="/search" element={<SearchWorker />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/doctors" element={<DoctorDirectory />} />
              <Route path="/scanner" element={<Scanner />} />
            </Routes>
          </main>
        </div>
      )}
    </LanguageProvider>
  );
}

export default App;
