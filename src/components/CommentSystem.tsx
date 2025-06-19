import React, { useState, useRef } from 'react';
import { MessageCircle, Upload, Send, X } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
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

interface CommentSystemProps {
  projectId: string;
  onCommentsUpdate?: (comments: Comment[]) => void;
}

export const CommentSystem: React.FC<CommentSystemProps> = ({ 
  projectId, 
  onCommentsUpdate 
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentPosition, setCommentPosition] = useState({ x: 0, y: 0 });
  const [commentText, setCommentText] = useState('');
  const [userName, setUserName] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handlePageClick = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setCommentPosition({ x, y });
    setShowCommentForm(true);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
      const filePath = `comments/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('comment-screenshots')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('comment-screenshots')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleSubmitComment = async () => {
    if (!commentText.trim()) {
      toast({
        title: "Comment required",
        description: "Please enter a comment before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      let imageUrl = null;
      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
        if (!imageUrl) {
          setIsLoading(false);
          return;
        }
      }

      const { data, error } = await supabase
        .from('comments')
        .insert({
          project_id: projectId,
          x: commentPosition.x,
          y: commentPosition.y,
          comment: commentText,
          user_name: userName || 'Anonymous',
          author: userName || 'Anonymous',
          image_url: imageUrl,
          status: 'open'
        })
        .select()
        .single();

      if (error) throw error;

      const newComment: Comment = data;
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      onCommentsUpdate?.(updatedComments);

      // Reset form
      setShowCommentForm(false);
      setCommentText('');
      setUserName('');
      setSelectedImage(null);
      
      toast({
        title: "Comment added",
        description: "Your comment has been successfully added.",
      });
    } catch (error) {
      console.error('Error saving comment:', error);
      toast({
        title: "Error",
        description: "Failed to save comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setComments(data || []);
      onCommentsUpdate?.(data || []);
    } catch (error) {
      console.error('Error loading comments:', error);
      toast({
        title: "Error",
        description: "Failed to load comments.",
        variant: "destructive",
      });
    }
  };

  React.useEffect(() => {
    loadComments();
  }, [projectId]);

  return (
    <div className="relative w-full h-full">
      {/* Clickable overlay */}
      <div 
        className="absolute inset-0 z-10 cursor-crosshair"
        onClick={handlePageClick}
        style={{ pointerEvents: showCommentForm ? 'none' : 'auto' }}
      />

      {/* Comment markers */}
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="absolute z-20 w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform"
          style={{ 
            left: comment.x - 12, 
            top: comment.y - 12,
            pointerEvents: 'auto'
          }}
          title={`${comment.user_name}: ${comment.comment}`}
        >
          <MessageCircle className="w-4 h-4 text-white m-0.5" />
        </div>
      ))}

      {/* Comment form */}
      {showCommentForm && (
        <div
          className="absolute z-30 bg-white border rounded-lg shadow-lg p-4 w-80"
          style={{ 
            left: Math.min(commentPosition.x, window.innerWidth - 320), 
            top: Math.min(commentPosition.y, window.innerHeight - 300)
          }}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Add Comment</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCommentForm(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Your name (optional)"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />

            <Textarea
              placeholder="Enter your comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full min-h-[80px] text-sm"
            />

            <div className="flex items-center space-x-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
                className="hidden"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center space-x-1"
              >
                <Upload className="w-4 h-4" />
                <span>Add Image</span>
              </Button>
              {selectedImage && (
                <span className="text-sm text-gray-600">
                  {selectedImage.name}
                </span>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCommentForm(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSubmitComment}
                disabled={isLoading}
                className="flex items-center space-x-1"
              >
                <Send className="w-4 h-4" />
                <span>{isLoading ? 'Saving...' : 'Submit'}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
