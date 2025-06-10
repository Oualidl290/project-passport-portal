
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';

const Client = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    const storedProjectId = localStorage.getItem('projectId');

    if (!storedRole || !storedProjectId || storedRole !== 'client') {
      // Redirect to onboarding if not properly set up
      navigate('/onboarding');
      return;
    }

    setUserRole(storedRole);
    setProjectId(storedProjectId);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('projectId');
    navigate('/onboarding');
  };

  if (!userRole || !projectId) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Client Dashboard</h1>
              <p className="text-muted-foreground">Project: {projectId}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="secondary">Client</Badge>
            <Button variant="outline" onClick={handleLogout}>
              Switch Project
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-lg">Project Overview</CardTitle>
              <CardDescription>
                View your project status and progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge variant="outline">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Progress:</span>
                  <span className="text-sm font-medium">75%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-lg">Recent Updates</CardTitle>
              <CardDescription>
                Latest changes to your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="font-medium">Design review completed</div>
                  <div className="text-muted-foreground">2 hours ago</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">New mockups uploaded</div>
                  <div className="text-muted-foreground">1 day ago</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>
                Common tasks and actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Request Changes
              </Button>
              <Button variant="outline" className="w-full justify-start">
                View Designs
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Send Feedback
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Project Details */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>
              Detailed information about your project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Project Information</h3>
                <div className="space-y-1 text-sm">
                  <div><span className="text-muted-foreground">ID:</span> {projectId}</div>
                  <div><span className="text-muted-foreground">Type:</span> Web Design</div>
                  <div><span className="text-muted-foreground">Started:</span> March 15, 2024</div>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Team</h3>
                <div className="space-y-1 text-sm">
                  <div><span className="text-muted-foreground">Lead Designer:</span> Sarah Johnson</div>
                  <div><span className="text-muted-foreground">Project Manager:</span> Mike Chen</div>
                  <div><span className="text-muted-foreground">Status:</span> In Progress</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Client;
