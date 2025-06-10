
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // User is authenticated, get their profile and redirect
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            if (profile.role === 'designer') {
              window.location.href = 'https://preview--elementor-request-buddy.lovable.app/';
            } else {
              window.location.href = 'https://preview--section-edit-whisper.lovable.app/';
            }
            return;
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuthAndRedirect();
  }, []);

  const handleGetStarted = () => {
    navigate('/onboarding');
  };

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Project Portal
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Connect clients and designers seamlessly
        </p>
        <Button 
          onClick={handleGetStarted}
          size="lg"
          className="transition-all duration-200 transform hover:scale-105"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Index;
