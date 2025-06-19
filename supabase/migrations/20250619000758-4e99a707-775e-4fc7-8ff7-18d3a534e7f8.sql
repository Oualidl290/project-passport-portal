
-- Delete the old bucket
DELETE FROM storage.buckets WHERE id = 'comment-images';

-- Create the new bucket with the desired name
INSERT INTO storage.buckets (id, name, public)
VALUES ('comment-screenshots', 'comment-screenshots', true);

-- Create storage policies for the comment-screenshots bucket
-- Allow anyone to view images (since bucket is public)
CREATE POLICY "Anyone can view comment screenshots"
ON storage.objects FOR SELECT
USING (bucket_id = 'comment-screenshots');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload comment screenshots"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'comment-screenshots' AND auth.role() = 'authenticated');

-- Allow users to update their own uploaded images
CREATE POLICY "Users can update their own comment screenshots"
ON storage.objects FOR UPDATE
USING (bucket_id = 'comment-screenshots' AND auth.role() = 'authenticated');

-- Allow users to delete their own uploaded images
CREATE POLICY "Users can delete their own comment screenshots"
ON storage.objects FOR DELETE
USING (bucket_id = 'comment-screenshots' AND auth.role() = 'authenticated');
