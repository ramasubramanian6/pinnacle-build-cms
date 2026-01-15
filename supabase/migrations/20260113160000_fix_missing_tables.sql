-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT, -- Stores Lucide icon name or image URL
    features TEXT[], -- Array of strings
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.services;
CREATE POLICY "Enable read access for all users" ON public.services
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.services;
CREATE POLICY "Enable insert for authenticated users only" ON public.services
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.services;
CREATE POLICY "Enable update for authenticated users only" ON public.services
    FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.services;
CREATE POLICY "Enable delete for authenticated users only" ON public.services
    FOR DELETE USING (auth.role() = 'authenticated');


-- 2. Blogs Table
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    author TEXT,
    date DATE DEFAULT CURRENT_DATE,
    read_time TEXT,
    category TEXT,
    featured BOOLEAN DEFAULT false,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.blogs;
CREATE POLICY "Enable read access for all users" ON public.blogs
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.blogs;
CREATE POLICY "Enable insert for authenticated users only" ON public.blogs
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.blogs;
CREATE POLICY "Enable update for authenticated users only" ON public.blogs
    FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.blogs;
CREATE POLICY "Enable delete for authenticated users only" ON public.blogs
    FOR DELETE USING (auth.role() = 'authenticated');


-- 3. Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_name TEXT NOT NULL,
    client_position TEXT,
    company TEXT,
    testimonial_text TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    image_url TEXT,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.testimonials;
CREATE POLICY "Enable read access for all users" ON public.testimonials
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.testimonials;
CREATE POLICY "Enable insert for authenticated users only" ON public.testimonials
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.testimonials;
CREATE POLICY "Enable update for authenticated users only" ON public.testimonials
    FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.testimonials;
CREATE POLICY "Enable delete for authenticated users only" ON public.testimonials
    FOR DELETE USING (auth.role() = 'authenticated');


-- 4. Workers (Team) Table
CREATE TABLE IF NOT EXISTS public.workers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    position TEXT,
    bio TEXT,
    phone TEXT,
    email TEXT,
    image_url TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.workers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.workers;
CREATE POLICY "Enable read access for all users" ON public.workers
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.workers;
CREATE POLICY "Enable insert for authenticated users only" ON public.workers
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.workers;
CREATE POLICY "Enable update for authenticated users only" ON public.workers
    FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.workers;
CREATE POLICY "Enable delete for authenticated users only" ON public.workers
    FOR DELETE USING (auth.role() = 'authenticated');


-- 5. Packages Table
CREATE TABLE IF NOT EXISTS public.packages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    includes TEXT[], 
    price_info TEXT,
    featured BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.packages;
CREATE POLICY "Enable read access for all users" ON public.packages
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.packages;
CREATE POLICY "Enable insert for authenticated users only" ON public.packages
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.packages;
CREATE POLICY "Enable update for authenticated users only" ON public.packages
    FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.packages;
CREATE POLICY "Enable delete for authenticated users only" ON public.packages
    FOR DELETE USING (auth.role() = 'authenticated');

-- Grant permissions to public/anon/authenticated roles just in case
GRANT SELECT ON public.services TO anon, authenticated;
GRANT SELECT ON public.blogs TO anon, authenticated;
GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT SELECT ON public.workers TO anon, authenticated;
GRANT SELECT ON public.packages TO anon, authenticated;
