-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit a contact form (public)
CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions
FOR INSERT
WITH CHECK (true);

-- Only authenticated users (admins) can view submissions
CREATE POLICY "Authenticated users can view submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (true);

-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'ongoing',
  category TEXT NOT NULL,
  image_url TEXT,
  progress INTEGER DEFAULT 0,
  start_date DATE,
  estimated_completion DATE,
  total_units INTEGER,
  sold_units INTEGER DEFAULT 0,
  amenities TEXT[],
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Anyone can view projects (public listing)
CREATE POLICY "Anyone can view projects"
ON public.projects
FOR SELECT
USING (true);

-- Only authenticated users can manage projects
CREATE POLICY "Authenticated users can insert projects"
ON public.projects
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
ON public.projects
FOR UPDATE
TO authenticated
USING (true);

-- Create user_projects table for client-project relationships
CREATE TABLE public.user_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'client',
  documents_count INTEGER DEFAULT 0,
  next_milestone TEXT,
  next_milestone_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, project_id)
);

-- Enable RLS
ALTER TABLE public.user_projects ENABLE ROW LEVEL SECURITY;

-- Users can view their own project assignments
CREATE POLICY "Users can view own project assignments"
ON public.user_projects
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create properties table
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  property_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'available',
  price NUMERIC NOT NULL,
  area_sqft INTEGER NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  location TEXT NOT NULL,
  address TEXT,
  image_url TEXT,
  gallery TEXT[],
  amenities TEXT[],
  featured BOOLEAN DEFAULT false,
  project_id UUID REFERENCES public.projects(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Anyone can view properties (public listing)
CREATE POLICY "Anyone can view properties"
ON public.properties
FOR SELECT
USING (true);

-- Only authenticated users can manage properties
CREATE POLICY "Authenticated users can insert properties"
ON public.properties
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update properties"
ON public.properties
FOR UPDATE
TO authenticated
USING (true);

-- Add trigger for updated_at on projects
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add trigger for updated_at on properties
CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();