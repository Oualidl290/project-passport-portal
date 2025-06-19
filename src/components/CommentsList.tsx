
import React, { useState, useEffect } from 'react';
import { MessageCircle, Calendar, User, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './ui/use-toast';

interface Comment {
  id: string;
  x: number;
  y: number;
  comment: string;
  user_name: string | null;
  author: string | null;
  image_url: string | null;
  created_at: string;
  status: string;
}

interface CommentsListProps {
  projectId: string;
  comments?: Comment[];
}

export const CommentsList: React.FC<CommentsListProps> = ({ 
  projectId, 
  comments: externalComments 
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const loadComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error loading comments:', error);
      toast({
        title: "Error",
        description: "Failed to load comments.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (externalComments) {
      setComments(externalComments);
    } else {
      loadComments();
    }
  }, [projectId, externalComments]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'open':
        return 'default';
      case 'resolved':
        return 'secondary';
      case 'in-progress':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <MessageCircle className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Comments ({comments.length})</h2>
      </div>

      {comments.length === 0 ? (
        <Card>
          <CardContent className="py-8">
            <div className="text-center text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No comments yet. Click anywhere on the page to add the first comment!</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <Card key={comment.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-sm">
                      {comment.user_name || comment.author || 'Anonymous'}
                    </span>
                    <Badge variant={getStatusBadgeVariant(comment.status)}>
                      {comment.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(comment.created_at)}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-700 mb-3">{comment.comment}</p>
                
                {comment.image_url && (
                  <div className="mt-3">
                    <div 
                      className="inline-flex items-center space-x-1 text-xs text-blue-600 cursor-pointer hover:text-blue-800"
                      onClick={() => setSelectedImage(comment.image_url)}
                    >
                      <ImageIcon className="w-3 h-3" />
                      <span>View attached image</span>
                    </div>
                  </div>
                )}
                
                <div className="mt-2 text-xs text-gray-400">
                  Position: ({comment.x}, {comment.y})
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Image modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-4xl p-4">
            <img 
              src={selectedImage} 
              alt="Comment attachment" 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};
