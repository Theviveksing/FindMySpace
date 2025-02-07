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

        window.google.accounts.id.initialize({
          client_id: '950012420743-a8udl7bn6kent06mn64k18poktm33r4d.apps.googleusercontent.com',
          callback: handleGoogleSignIn,
          auto_select: false,
          cancel_on_tap_outside: true,
          context: 'signin'
        });

        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button')!,
          { 
            type: 'standard',
            theme: 'filled_blue',
            size: 'large',
            text: 'continue_with',
            shape: 'rectangular',
            width: 280,
            logo_alignment: 'left'
          }
        );
      } catch (error) {
        console.error('Error initializing Google Sign In:', error);
        setError('Failed to initialize Google Sign In. Please refresh the page.');
      }
    };

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleSignIn;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
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

  const handleGoogleSignIn = async (response: any) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error: signInError } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential,
        nonce: 'NONCE' // Replace with a secure nonce if needed
      });

      if (signInError) throw signInError;

      if (data.user) {
        if (!data.user.user_metadata?.role) {
          setPendingUser(data.user);
          setShowRoleModal(true);
          return;
        }

        const userRole = data.user.user_metadata?.role;
        setUserRole(userRole);
        navigateBasedOnRole(userRole);
      }
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      setError(error.message || 'Failed to sign in with Google. Please try again.');
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
      
      <div 
        id="google-signin-button" 
        className={`flex justify-center transition-opacity duration-200 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
      />

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