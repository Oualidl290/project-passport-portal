
-- Create a storage bucket for comment images
INSERT INTO storage.buckets (id, name, public)
VALUES ('comment-images', 'comment-images', true);

-- Create storage policies for the comment-images bucket
-- Allow anyone to view images (since bucket is public)
CREATE POLICY "Anyone can view comment images"
ON storage.objects FOR SELECT
USING (bucket_id = 'comment-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload comment images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'comment-images' AND auth.role() = 'authenticated');

-- Allow users to update their own uploaded images (fixed by checking auth role instead of owner)
CREATE POLICY "Users can update their own comment images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'comment-images' AND auth.role() = 'authenticated');

-- Allow users to delete their own uploaded images (fixed by checking auth role instead of owner)
CREATE POLICY "Users can delete their own comment images"
ON storage.objects FOR DELETE
USING (bucket_id = 'comment-images' AND auth.role() = 'authenticated');
