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

  const generateNonce = async (): Promise<[string, string]> => {
    const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))));
    const encoder = new TextEncoder();
    const encodedNonce = encoder.encode(nonce);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encodedNonce);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedNonce = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return [nonce, hashedNonce];
  };

  useEffect(() => {
    const initializeGoogleSignIn = async () => {
      try {
        const [nonce, hashedNonce] = await generateNonce();
        
        // Check for existing session
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData.session) {
          console.log('Existing session found:', sessionData.session);
          handleExistingSession(sessionData.session);
          return;
        }

        window.google.accounts.id.initialize({
          client_id: '950012420743-a8udl7bn6kent06mn64k18poktm33r4d.apps.googleusercontent.com',
          callback: handleGoogleSignIn,
          nonce: hashedNonce,
          use_fedcm_for_prompt: true,
          auto_select: true,
        });

        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button')!,
          { 
            type: 'standard',
            theme: 'filled_blue',
            size: 'large',
            text: 'continue_with',
            shape: 'pill',
            width: 280
          }
        );

        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed()) {
            console.error('One Tap not displayed:', notification.getNotDisplayedReason());
          } else if (notification.isSkippedMoment()) {
            console.log('One Tap skipped:', notification.getSkippedReason());
          } else if (notification.isDismissedMoment()) {
            console.log('One Tap dismissed:', notification.getDismissedReason());
          }
        });
      } catch (error) {
        console.error('Error initializing Google Sign In:', error);
        setError('Failed to initialize Google Sign In');
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
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('No user found');
      console.log('User data:', user);

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
      setError('Failed to retrieve user data');
    }
  };

  const handleGoogleSignIn = async (response: any) => {
    try {
      console.log('Google Sign In response:', response);
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential,
      });

      if (error) throw error;
      console.log('Supabase sign in response:', data);

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
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError('Failed to sign in with Google');
    }
  };

  const handleRoleSelection = async (selectedRole: 'owner' | 'user') => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: { role: selectedRole }
      });

      if (error) throw error;

      setUserRole(selectedRole);
      setShowRoleModal(false);
      navigateBasedOnRole(selectedRole);
    } catch (error) {
      console.error('Error updating user role:', error);
      setError('Failed to update user role');
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
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      <div 
        id="google-signin-button" 
        className="flex justify-center transform hover:scale-105 transition-transform duration-200"
      />
      {showRoleModal && (
        <RoleSelectionModal
          language="en"
          onSelect={handleRoleSelection}
          onClose={() => setShowRoleModal(false)}
        />
      )}
    </div>
  );
};

export default GoogleOneTap;