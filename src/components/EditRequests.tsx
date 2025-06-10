
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserProfile } from '@/hooks/useUserProfile';
import { MessageSquare, Plus, Clock } from 'lucide-react';

interface EditRequest {
  id: string;
  message: string;
  status: string;
  page_url: string;
  section_id: string | null;
  submitted_by: string | null;
  replies: any[] | null;
  created_at: string;
  project_id: string;
}

interface EditRequestsProps {
  profile: UserProfile;
}

export const EditRequests = ({ profile }: EditRequestsProps) => {
  const [requests, setRequests] = useState<EditRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    message: '',
    page_url: '',
    section_id: ''
  });

  useEffect(() => {
    fetchRequests();
  }, [profile]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('edit_requests')
        .select('*')
        .eq('project_id', profile.project_id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching requests:', error);
      } else {
        setRequests(data || []);
      }
    } catch (err) {
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const createRequest = async () => {
    if (!newRequest.message.trim() || !newRequest.page_url.trim()) {
      return;
    }

    try {
      const { error } = await supabase
        .from('edit_requests')
        .insert({
          message: newRequest.message,
          page_url: newRequest.page_url,
          section_id: newRequest.section_id || null,
          project_id: profile.project_id,
          submitted_by: profile.id,
          status: 'open'
        });

      if (error) {
        console.error('Error creating request:', error);
      } else {
        setNewRequest({ message: '', page_url: '', section_id: '' });
        setShowNewRequestForm(false);
        fetchRequests();
      }
    } catch (err) {
      console.error('Error creating request:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Edit Requests</h2>
          <p className="text-muted-foreground">Project: {profile.project_id}</p>
        </div>
        {profile.role === 'client' && (
          <Button onClick={() => setShowNewRequestForm(!showNewRequestForm)}>
            <Plus className="w-4 h-4 mr-2" />
            New Request
          </Button>
        )}
      </div>

      {showNewRequestForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Edit Request</CardTitle>
            <CardDescription>Submit a new request for changes or improvements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="page_url">Page URL *</Label>
              <Input
                id="page_url"
                value={newRequest.page_url}
                onChange={(e) => setNewRequest({ ...newRequest, page_url: e.target.value })}
                placeholder="https://example.com/page"
              />
            </div>
            <div>
              <Label htmlFor="section_id">Section ID (optional)</Label>
              <Input
                id="section_id"
                value={newRequest.section_id}
                onChange={(e) => setNewRequest({ ...newRequest, section_id: e.target.value })}
                placeholder="header-section"
              />
            </div>
            <div>
              <Label htmlFor="message">Description *</Label>
              <Textarea
                id="message"
                value={newRequest.message}
                onChange={(e) => setNewRequest({ ...newRequest, message: e.target.value })}
                placeholder="Describe the changes you need..."
                rows={4}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={createRequest}>Submit Request</Button>
              <Button variant="outline" onClick={() => setShowNewRequestForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {requests.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No edit requests found for this project</p>
              {profile.role === 'client' && (
                <p className="text-sm text-muted-foreground mt-2">
                  Click "New Request" to create your first request
                </p>
              )}
            </CardContent>
          </Card>
        ) : (
          requests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{request.page_url}</CardTitle>
                    {request.section_id && (
                      <CardDescription>Section: {request.section_id}</CardDescription>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(request.status)}>
                      {request.status.replace('_', ' ')}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(request.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{request.message}</p>
                {request.replies && request.replies.length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Replies:</h4>
                    <div className="space-y-2">
                      {request.replies.map((reply: any, index: number) => (
                        <div key={index} className="bg-muted p-3 rounded">
                          <p className="text-sm">{reply.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(reply.created_at).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
