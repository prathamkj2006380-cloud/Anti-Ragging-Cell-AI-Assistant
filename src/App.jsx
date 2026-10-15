import React, { useState } from 'react';
import { ComplaintProvider } from './context/ComplaintContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EmergencyBanner } from './components/EmergencyBanner';
import { QuickHideModal } from './components/QuickHideModal';

import { HomePage } from './pages/HomePage';
import { ChatbotPage } from './pages/ChatbotPage';
import { ComplaintRegistrationPage } from './pages/ComplaintRegistrationPage';
import { ComplaintTrackingPage } from './pages/ComplaintTrackingPage';
import { EmergencyHelpPage } from './pages/EmergencyHelpPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [trackingSearchId, setTrackingSearchId] = useState('');
  const [isQuickHideOpen, setIsQuickHideOpen] = useState(false);

  // Navigate to tracker with a specific ID
  const handleSelectTrackingDemo = (id) => {
    setTrackingSearchId(id);
    setCurrentPage('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When a complaint is registered, jump to tracking page
  const handleComplaintCreated = (newId) => {
    setTrackingSearchId(newId);
    setCurrentPage('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ComplaintProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-teal-500 selection:text-white">
        
        {/* Top Emergency Toll-Free Alert Banner */}
        <EmergencyBanner onEmergencyClick={() => setCurrentPage('emergency')} />

        {/* Global Navigation Bar */}
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onQuickHide={() => setIsQuickHideOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full animate-fade-in">
          {currentPage === 'home' && (
            <HomePage
              setCurrentPage={setCurrentPage}
              onSelectTrackingDemo={handleSelectTrackingDemo}
            />
          )}

          {currentPage === 'chatbot' && (
            <ChatbotPage setCurrentPage={setCurrentPage} />
          )}

          {currentPage === 'register' && (
            <ComplaintRegistrationPage
              setCurrentPage={setCurrentPage}
              onComplaintCreated={handleComplaintCreated}
            />
          )}

          {currentPage === 'track' && (
            <ComplaintTrackingPage
              initialSearchId={trackingSearchId}
              setCurrentPage={setCurrentPage}
            />
          )}

          {currentPage === 'emergency' && (
            <EmergencyHelpPage setCurrentPage={setCurrentPage} />
          )}

          {currentPage === 'admin' && (
            <AdminDashboardPage />
          )}
        </main>

        {/* Institutional Footer */}
        <Footer setCurrentPage={setCurrentPage} />

        {/* Panic / Quick Hide Disguised Screen Modal */}
        <QuickHideModal
          isOpen={isQuickHideOpen}
          onClose={() => setIsQuickHideOpen(false)}
        />

      </div>
    </ComplaintProvider>
  );
}

export default App;
