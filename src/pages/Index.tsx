
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has completed onboarding
    const userRole = localStorage.getItem('userRole');
    const projectId = localStorage.getItem('projectId');

    if (userRole && projectId) {
      // Redirect to appropriate dashboard
      if (userRole === 'client') {
        navigate('/client');
      } else if (userRole === 'designer') {
        navigate('/designer');
      }
    }
  }, [navigate]);

  const handleGetStarted = () => {
    navigate('/onboarding');
  };

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
