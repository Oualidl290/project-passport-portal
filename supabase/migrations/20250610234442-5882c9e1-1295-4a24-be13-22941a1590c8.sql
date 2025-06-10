
-- Add project_id column to edit_requests table to link requests to projects
ALTER TABLE public.edit_requests 
ADD COLUMN project_id TEXT NOT NULL DEFAULT '';

-- Update existing requests to have a project_id (you may want to set a default value)
UPDATE public.edit_requests 
SET project_id = 'default-project' 
WHERE project_id = '';

-- Create RLS policies for edit_requests based on project access
CREATE POLICY "Users can view requests from their project" 
  ON public.edit_requests 
  FOR SELECT 
  USING (
    project_id IN (
      SELECT p.project_id 
      FROM public.profiles p 
      WHERE p.id = auth.uid()
    )
  );

CREATE POLICY "Users can create requests for their project" 
  ON public.edit_requests 
  FOR INSERT 
  WITH CHECK (
    project_id IN (
      SELECT p.project_id 
      FROM public.profiles p 
      WHERE p.id = auth.uid()
    )
  );

CREATE POLICY "Users can update requests from their project" 
  ON public.edit_requests 
  FOR UPDATE 
  USING (
    project_id IN (
      SELECT p.project_id 
      FROM public.profiles p 
      WHERE p.id = auth.uid()
    )
  );

CREATE POLICY "Users can delete requests from their project" 
  ON public.edit_requests 
  FOR DELETE 
  USING (
    project_id IN (
      SELECT p.project_id 
      FROM public.profiles p 
      WHERE p.id = auth.uid()
    )
  );

-- Enable RLS on edit_requests table
ALTER TABLE public.edit_requests ENABLE ROW LEVEL SECURITY;
