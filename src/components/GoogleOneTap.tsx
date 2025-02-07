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
      const [nonce, hashedNonce] = await generateNonce();

      // Check for existing session
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session) {
        handleExistingSession(sessionData.session);
        return;
      }

      window.google.accounts.id.initialize({
        client_id: '950012420743-a8udl7bn6kent06mn64k18poktm33r4d.apps.googleusercontent.com',
        callback: handleGoogleSignIn,
        nonce: hashedNonce,
        use_fedcm_for_prompt: true,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button')!,
        { 
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          width: '100%'
        }
      );

      window.google.accounts.id.prompt();
    };

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
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

      // If user has no role, show role selection modal
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
    }
  };

  const handleGoogleSignIn = async (response: any) => {
    try {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential,
        nonce: response.nonce,
      });

      if (error) throw error;

      if (data.user) {
        // If user has no role, show role selection modal
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
    }
  };

  const handleRoleSelection = async (selectedRole: 'owner' | 'user') => {
    try {
      // Update user metadata with selected role
      const { error } = await supabase.auth.updateUser({
        data: { role: selectedRole }
      });

      if (error) throw error;

      setUserRole(selectedRole);
      setShowRoleModal(false);
      navigateBasedOnRole(selectedRole);
    } catch (error) {
      console.error('Error updating user role:', error);
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
      <div id="google-signin-button" className="flex justify-center" />
      <div id="google-one-tap" />
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