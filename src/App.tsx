import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import OwnerDashboard from './pages/OwnerDashboard';
import CreateListing from './pages/CreateListing';
import SignIn from './pages/SignIn';
import LoadingScreen from './components/LoadingScreen';
import { NotificationProvider } from './components/Notifications';

export type UserRole = 'owner' | 'user' | null;
export type Language = 'en' | 'hi';

const supabase = createClient(
  'https://wjrhvzvuoufluqhiclnd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indqcmh2enZ1b3VmbHVxaGljbG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2MzU5NDIsImV4cCI6MjA1MzIxMTk0Mn0.H_j9mOWINMUTkIjAVYO5L105VbkoeofqElAFj2R3P-U'
);

function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    checkUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserRole(session.user.user_metadata?.role || null);
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserRole(session.user.user_metadata?.role || null);
      }
    } catch (error) {
      console.error('Error checking user session:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUserRole(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  const ProtectedOwnerRoute = ({ children }: { children: React.ReactNode }) => {
    if (!userRole) {
      return <Navigate to="/signin" />;
    }
    if (userRole !== 'owner') {
      return <Navigate to="/listings" />;
    }
    return <>{children}</>;
  };

  const ProtectedUserRoute = ({ children }: { children: React.ReactNode }) => {
    if (!userRole) {
      return <Navigate to="/signin" />;
    }
    return <>{children}</>;
  };

  return (
    <Router>
      <NotificationProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar 
            userRole={userRole}
            onSignOut={handleSignOut}
          />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage userRole={userRole} />} />
              <Route path="/listings" element={
                <ProtectedUserRoute>
                  <ListingsPage language={language} />
                </ProtectedUserRoute>
              } />
              <Route path="/signin" element={
                userRole ? (
                  <Navigate to={userRole === 'owner' ? '/owner/dashboard' : '/listings'} />
                ) : (
                  <SignIn setUserRole={setUserRole} />
                )
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
          <Footer />
        </div>
      </NotificationProvider>
    </Router>
  );
}

export default App;