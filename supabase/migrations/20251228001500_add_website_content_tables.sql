-- Create workers table for team members
CREATE TABLE IF NOT EXISTS public.workers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  bio TEXT,
  phone TEXT,
  email TEXT,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create packages table for service packages
CREATE TABLE IF NOT EXISTS public.packages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  includes TEXT[],
  price_info TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create testimonials table for client reviews
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_position TEXT,
  company TEXT,
  testimonial_text TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- RLS Policies for workers table
CREATE POLICY "Anyone can view workers"
ON public.workers
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert workers"
ON public.workers
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update workers"
ON public.workers
FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete workers"
ON public.workers
FOR DELETE
TO authenticated
USING (true);

-- RLS Policies for packages table
CREATE POLICY "Anyone can view packages"
ON public.packages
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert packages"
ON public.packages
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update packages"
ON public.packages
FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete packages"
ON public.packages
FOR DELETE
TO authenticated
USING (true);

-- RLS Policies for testimonials table
CREATE POLICY "Anyone can view testimonials"
ON public.testimonials
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert testimonials"
ON public.testimonials
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update testimonials"
ON public.testimonials
FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete testimonials"
ON public.testimonials
FOR DELETE
TO authenticated
USING (true);

-- Add triggers for updated_at
CREATE TRIGGER update_workers_updated_at
BEFORE UPDATE ON public.workers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_packages_updated_at
BEFORE UPDATE ON public.packages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial worker data
INSERT INTO public.workers (name, position, bio, phone, email, order_index) VALUES
(
  'Mr A. Ulagu Lakshmanan',
  'Director',
  'Trusted civil engineer and construction contractor in Tamil Nadu, with over 35 years of experience in road construction, RCC works, and large-scale infrastructure projects. Serving major government departments, recognised for high-quality construction, advanced machinery, stringent safety standards, and timely project delivery across multiple districts.',
  '+91 9894948011',
  'brixxspace@gmail.com',
  1
),
(
  'Er. Loknath S, M.E',
  'Design & Technical Lead',
  'Structural engineering professional with strong expertise in civil construction, design, and project execution. Holding an M.E. in Structural Engineering from Anna University and certified in advanced RCC design, he brings technical precision and modern engineering insight to every project. With hands-on experience as a Project Manager and a proven research background in materials and durability studies, he delivers solutions that blend practicality, innovation, and structural reliability.',
  '+91 9894948011',
  'brixxspace@gmail.com',
  2
);

-- Insert initial package data
INSERT INTO public.packages (name, description, includes, price_info, featured, order_index) VALUES
(
  'Consult Package',
  'Basic consultancy',
  ARRAY['Expert consultation', 'Site feasibility guidance', 'Basic planning advice'],
  'Contact for pricing',
  false,
  1
),
(
  'Assist Package',
  'Consultancy + Labour',
  ARRAY['Consultancy', 'Skilled labour team', 'Basic supervision', 'Execution support'],
  'Contact for pricing',
  false,
  2
),
(
  'BOQ Package',
  'Detailed BOQ service',
  ARRAY['Bill of Quantity', 'Material estimation', 'Cost planning', 'Optimised budget suggestions'],
  'Contact for pricing',
  false,
  3
),
(
  'Smart Package',
  'Smart contract – choose services',
  ARRAY['Consultancy', 'Labour', 'BOQ', 'Site visits', 'Quality checks', 'Add-on services (pay-per-service)'],
  'Flexible pricing',
  true,
  4
);

-- Update properties table RLS for authentication-based access
-- Drop existing public view policy if it exists
DROP POLICY IF EXISTS "Anyone can view properties" ON public.properties;

-- Create new policies for two-tier access
-- Public users can only see basic information
CREATE POLICY "Public can view basic property info"
ON public.properties
FOR SELECT
TO anon
USING (true);

-- Authenticated users can see all property information
CREATE POLICY "Authenticated users can view full property info"
ON public.properties
FOR SELECT
TO authenticated
USING (true);

-- Note: The application will handle which columns to display based on authentication status
