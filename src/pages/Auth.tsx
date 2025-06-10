
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthProps {
  selectedRole: 'client' | 'designer';
  projectId: string;
}

const Auth = ({ selectedRole, projectId }: AuthProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        redirectBasedOnRole(selectedRole);
      }
    };
    checkUser();
  }, [selectedRole]);

  const redirectBasedOnRole = (role: 'client' | 'designer') => {
    if (role === 'designer') {
      window.location.href = 'https://preview--elementor-request-buddy.lovable.app/';
    } else {
      window.location.href = 'https://preview--section-edit-whisper.lovable.app/';
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          toast({
            title: "Login Error",
            description: error.message,
            variant: "destructive"
          });
          return;
        }

        if (data.user) {
          // Get user profile to check role
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .single();

          if (profileError || !profile) {
            toast({
              title: "Error",
              description: "Could not fetch user profile",
              variant: "destructive"
            });
            return;
          }

          redirectBasedOnRole(profile.role as 'client' | 'designer');
        }
      } else {
        // Signup
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              role: selectedRole,
              project_id: projectId
            }
          }
        });

        if (error) {
          toast({
            title: "Signup Error",
            description: error.message,
            variant: "destructive"
          });
          return;
        }

        if (data.user) {
          toast({
            title: "Success",
            description: "Account created successfully! Please check your email to verify your account.",
          });
          
          // If email confirmation is disabled, redirect immediately
          if (data.session) {
            redirectBasedOnRole(selectedRole);
          }
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h1>
          <p className="text-muted-foreground">
            {isLogin ? 'Sign in to continue as a' : 'Sign up to continue as a'} <span className="font-medium">{selectedRole}</span>
          </p>
          <p className="text-sm text-muted-foreground mt-1">Project: {projectId}</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </CardTitle>
            <CardDescription>
              Enter your email and password to {isLogin ? 'sign in' : 'create your account'}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{isLogin ? 'Signing in...' : 'Creating account...'}</span>
                  </div>
                ) : (
                  isLogin ? 'Sign In' : 'Sign Up'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-1 text-primary hover:underline font-medium"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/onboarding')}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            ← Back to role selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
