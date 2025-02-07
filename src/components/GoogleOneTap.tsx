import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import RoleSelectionModal from './RoleSelectionModal';

interface GoogleOneTapProps {
  setUserRole: (role: 'owner' | 'user' | null) => void;
}

const supabase = createClient(
  'https://wjrhvzvuoufluqhiclnd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indqcmh2enZ1b3VmbHVxaGljbG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2MzU5NDIsImV4cCI6MjA1MzIxMTk0Mn0.H_j9mOWINMUTkIjAVYO5L105VbkoeofqElAFj2R3P-U'
);

const GoogleOneTap = ({ setUserRole }: GoogleOneTapProps) => {
  const navigate = useNavigate();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [pendingUser, setPendingUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initializeGoogleSignIn = async () => {
      try {
        // Check for existing session
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData.session) {
          handleExistingSession(sessionData.session);
          return;
        }

        const { data: { session } } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            queryParams: {
              access_type: 'offline',
              prompt: 'consent',
            },
          },
        });

        if (session) {
          handleExistingSession(session);
        }
      } catch (error) {
        console.error('Error initializing Google Sign In:', error);
        setError('Failed to initialize Google Sign In. Please refresh the page.');
      }
    };

    initializeGoogleSignIn();
  }, []);

  const handleExistingSession = async (session: any) => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('No user found');

      if (!user.user_metadata?.role) {
        setPendingUser(user);
        setShowRoleModal(true);
        return;
      }

      const userRole = user.user_metadata?.role;
      setUserRole(userRole);
      navigateBasedOnRole(userRole);
    } catch (error) {
      console.error('Error handling existing session:', error);
      setError('Failed to retrieve user data. Please try signing in again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelection = async (selectedRole: 'owner' | 'user') => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.updateUser({
        data: { role: selectedRole }
      });

      if (error) throw error;

      setUserRole(selectedRole);
      setShowRoleModal(false);
      navigateBasedOnRole(selectedRole);
    } catch (error: any) {
      console.error('Error updating user role:', error);
      setError(error.message || 'Failed to update user role. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const navigateBasedOnRole = (role: 'owner' | 'user') => {
    if (role === 'owner') {
      navigate('/owner/dashboard');
    } else {
      navigate('/listings');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;

      if (data.session) {
        handleExistingSession(data.session);
      }
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      setError(error.message || 'Failed to sign in with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm animate-fade-in">
          {error}
          <button 
            onClick={() => setError(null)}
            className="ml-2 text-red-700 hover:text-red-800 font-medium"
          >
            Try Again
          </button>
        </div>
      )}
      
      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors"
        disabled={isLoading}
      >
        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
        Continue with Google
      </button>

      {isLoading && (
        <div className="flex justify-center">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {showRoleModal && (
        <RoleSelectionModal
          onSelect={handleRoleSelection}
          onClose={() => setShowRoleModal(false)}
        />
      )}
    </div>
  );
};

export default GoogleOneTap;