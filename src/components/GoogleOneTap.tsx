import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://wjrhvzvuoufluqhiclnd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indqcmh2enZ1b3VmbHVxaGljbG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2MzU5NDIsImV4cCI6MjA1MzIxMTk0Mn0.H_j9mOWINMUTkIjAVYO5L105VbkoeofqElAFj2R3P-U'
);

const GoogleOneTap = () => {
  useEffect(() => {
    const initializeGoogleSignIn = async () => {
      const [nonce, hashedNonce] = await generateNonce();

      // Check for existing session
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session) return;

      window.google.accounts.id.initialize({
        client_id: '950012420743-a8udl7bn6kent06mn64k18poktm33r4d.apps.googleusercontent.com',
        callback: handleGoogleSignIn,
        nonce: hashedNonce,
        use_fedcm_for_prompt: true,
      });

      // Render the traditional sign-in button
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

      // Also show the One Tap prompt
      window.google.accounts.id.prompt();
    };

    // Load Google script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onload = initializeGoogleSignIn;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const generateNonce = async (): Promise<[string, string]> => {
    const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))));
    const encoder = new TextEncoder();
    const encodedNonce = encoder.encode(nonce);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encodedNonce);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedNonce = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return [nonce, hashedNonce];
  };

  const handleGoogleSignIn = async (response: any) => {
    try {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential,
      });

      if (error) throw error;
      
      // Redirect or update UI after successful sign in
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div id="google-signin-button" className="flex justify-center" />
      <div id="google-one-tap" />
    </div>
  );
};

export default GoogleOneTap;