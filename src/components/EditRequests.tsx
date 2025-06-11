
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EditRequest {
  id: string;
  message: string;
  page_url: string;
  section_id: string;
  status: string;
  submitted_by: string;
  project_id: string;
  replies: any[];
  created_at: string;
  updated_at: string;
}

interface EditRequestsProps {
  userRole: 'client' | 'designer';
  projectId: string;
}

const EditRequests = ({ userRole, projectId }: EditRequestsProps) => {
  const [requests, setRequests] = useState<EditRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data, error } = await supabase
          .from('edit_requests')
          .select('*')
          .eq('project_id', projectId)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching requests:', error);
        } else {
          const formattedData = data?.map(item => ({
            ...item,
            replies: Array.isArray(item.replies) ? item.replies : []
          })) || [];
          setRequests(formattedData);
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchRequests();
    }
  }, [projectId]);

  if (loading) {
    return <div>Loading requests...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Edit Requests</h2>
      {requests.length === 0 ? (
        <p>No requests found for this project.</p>
      ) : (
        requests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <CardTitle>Request #{request.id.slice(0, 8)}</CardTitle>
              <CardDescription>Status: {request.status}</CardDescription>
            </CardHeader>
            <CardContent>
              <p><strong>Message:</strong> {request.message}</p>
              <p><strong>Page URL:</strong> {request.page_url}</p>
              <p><strong>Section ID:</strong> {request.section_id}</p>
              {request.replies && request.replies.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold">Replies:</h4>
                  {request.replies.map((reply: any, index: number) => (
                    <div key={index} className="mt-2 p-2 bg-muted rounded">
                      {reply}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default EditRequests;
