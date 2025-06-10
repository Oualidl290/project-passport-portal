
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { User, Palette } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Onboarding = () => {
  const [selectedRole, setSelectedRole] = useState<'client' | 'designer' | null>(null);
  const [projectId, setProjectId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Get user profile to redirect based on role
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
        }
      }
    };
    checkAuth();
  }, []);

  const handleContinue = () => {
    if (!selectedRole || !projectId.trim()) {
      return;
    }

    setIsLoading(true);

    // Navigate to auth page with role and project ID as state
    navigate('/auth', {
      state: {
        selectedRole,
        projectId: projectId.trim()
      }
    });
  };

  const isFormValid = selectedRole && projectId.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome!</h1>
          <p className="text-muted-foreground">Let's get you set up in just a few steps</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Get Started</CardTitle>
            <CardDescription>
              Tell us about yourself and your project
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">I am a...</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedRole('client')}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedRole === 'client'
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <User className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-medium">Client</div>
                  <div className="text-xs text-muted-foreground">I need design work</div>
                </button>
                
                <button
                  onClick={() => setSelectedRole('designer')}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedRole === 'designer'
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <Palette className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-medium">Designer</div>
                  <div className="text-xs text-muted-foreground">I create designs</div>
                </button>
              </div>
            </div>

            {/* Project ID Input */}
            <div className="space-y-2">
              <Label htmlFor="projectId" className="text-sm font-medium">
                Project ID
              </Label>
              <Input
                id="projectId"
                type="text"
                placeholder="Enter your project ID"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
              <p className="text-xs text-muted-foreground">
                This will be used to organize and filter your work
              </p>
            </div>

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              disabled={!isFormValid || isLoading}
              className="w-full transition-all duration-200 transform hover:scale-105 disabled:transform-none"
              size="lg"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Continue...</span>
                </div>
              ) : (
                'Continue'
              )}
            </Button>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            Next, you'll create an account to secure your access
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
