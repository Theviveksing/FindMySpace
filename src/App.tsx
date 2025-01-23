import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import OwnerDashboard from './pages/OwnerDashboard';
import CreateListing from './pages/CreateListing';
import SignIn from './pages/SignIn';

export type Language = 'en' | 'hi';
export type UserRole = 'owner' | 'user' | null;

function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [userRole, setUserRole] = useState<UserRole>(null);

  const ProtectedOwnerRoute = ({ children }: { children: React.ReactNode }) => {
    if (userRole !== 'owner') {
      return <Navigate to="/signin" />;
    }
    return <>{children}</>;
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar 
          language={language} 
          setLanguage={setLanguage} 
          userRole={userRole}
          setUserRole={setUserRole}
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage language={language} />} />
            <Route path="/listings" element={<ListingsPage language={language} />} />
            <Route path="/signin" element={
              <SignIn 
                language={language} 
                setUserRole={setUserRole} 
              />
            } />
            <Route path="/owner/dashboard" element={
              <ProtectedOwnerRoute>
                <OwnerDashboard language={language} />
              </ProtectedOwnerRoute>
            } />
            <Route path="/owner/create-listing" element={
              <ProtectedOwnerRoute>
                <CreateListing language={language} />
              </ProtectedOwnerRoute>
            } />
          </Routes>
        </main>
        <Footer language={language} />
      </div>
    </Router>
  );
}

export default App;