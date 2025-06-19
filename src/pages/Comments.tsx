
import React from 'react';
import { CommentSystem } from '@/components/CommentSystem';
import { CommentsList } from '@/components/CommentsList';

const Comments = () => {
  // For demo purposes, using a sample project ID
  // In a real app, this would come from routing or context
  const projectId = 'demo-project-123';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content area with comment system */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6 min-h-[600px] relative">
              <h1 className="text-2xl font-bold mb-4">Interactive Comment Demo</h1>
              <p className="text-gray-600 mb-6">
                Click anywhere on this area to add a comment with optional image attachments.
                This simulates how the comment system would work on your actual website sections.
              </p>
              
              {/* Demo content */}
              <div className="space-y-4 text-gray-700">
                <h2 className="text-xl font-semibold">Sample Website Section</h2>
                <p>
                  This is a sample section of content where users can add comments. 
                  In your actual implementation, this would be replaced with your real website content.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Feature Highlight</h3>
                  <p className="text-sm">
                    Users can click anywhere to add contextual comments with images, 
                    making feedback and collaboration more visual and specific.
                  </p>
                </div>
              </div>

              {/* Comment system overlay */}
              <CommentSystem projectId={projectId} />
            </div>
          </div>

          {/* Comments sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <CommentsList projectId={projectId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
