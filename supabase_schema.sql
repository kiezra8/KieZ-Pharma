-- Enable the UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE public.categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  rating NUMERIC DEFAULT 5.0,
  reviews INTEGER DEFAULT 0,
  sold INTEGER DEFAULT 0,
  image TEXT NOT NULL,
  images TEXT[] DEFAULT array[]::TEXT[],
  description TEXT,
  features TEXT[] DEFAULT array[]::TEXT[],
  in_stock BOOLEAN DEFAULT true,
  badge TEXT,
  brand TEXT,
  is_essential BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.banners (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  badge TEXT,
  cta TEXT DEFAULT 'Shop Now',
  image TEXT NOT NULL,
  gradient TEXT DEFAULT 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Policies (Make everything readable to everyone, but writable only by authenticated users)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert access to categories" ON public.categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update access to categories" ON public.categories FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete access to categories" ON public.categories FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read access to products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert access to products" ON public.products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update access to products" ON public.products FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete access to products" ON public.products FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read access to banners" ON public.banners FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert access to banners" ON public.banners FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update access to banners" ON public.banners FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete access to banners" ON public.banners FOR DELETE USING (auth.role() = 'authenticated');

-- Storage setup for images
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);
CREATE POLICY "Allow public view access to images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Allow authenticated insert access to images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update access to images" ON storage.objects FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete access to images" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- SEED DATA
-- Categories
INSERT INTO public.categories (name, icon, color) VALUES
('Surgical', 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=200&h=200&fit=crop', '#FF6B6B'),
('Diagnostics', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop', '#4ECDC4'),
('Wound Care', 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=200&h=200&fit=crop', '#45B7D1'),
('IV & Infusion', 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=200&h=200&fit=crop', '#96CEB4'),
('PPE', 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=200&h=200&fit=crop', '#FFEAA7'),
('Orthopaedic', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop', '#DDA0DD'),
('Dental', 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=200&h=200&fit=crop', '#F0A500'),
('Lab Supplies', 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=200&h=200&fit=crop', '#6C63FF'),
('Pharmacy', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&h=200&fit=crop', '#FF8B94'),
('Rehabilitation', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&h=200&fit=crop', '#A8E6CF');

-- Banners
INSERT INTO public.banners (title, subtitle, badge, cta, image, gradient) VALUES
('Premium Surgical Supplies', 'Hospital-grade instruments delivered to your door', 'NEW ARRIVAL', 'Shop Now', 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=500&fit=crop', 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'),
('Fast & Reliable Delivery', 'Free delivery on orders above UGX 300,000. All over Uganda.', 'EXPRESS DELIVERY', 'Order Now', 'https://images.unsplash.com/photo-1586528116311-ad8662990479?w=800&h=500&fit=crop', 'linear-gradient(135deg, #FF6B6B 0%, #EE5253 100%)'),
('Pharmacy & Drugs', 'All your medications and prescriptions in one place', 'POPULAR', 'Browse Drugs', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&h=500&fit=crop', 'linear-gradient(135deg, #FF8B94 0%, #FFB7B2 100%)'),
('Diagnostic Equipment', 'Accurate, fast and reliable medical diagnostics', 'BEST SELLER', 'Explore', 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&h=500&fit=crop', 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)');

-- Products
INSERT INTO public.products (name, category, price, original_price, rating, reviews, sold, image, images, description, features, in_stock, badge, brand, is_essential) VALUES
('Surgical Scalpel Set (10pcs)', 'Surgical', 45000, 60000, 4.8, 234, 1200, 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=400&fit=crop', ARRAY['https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=600&fit=crop','https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&h=600&fit=crop','https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=600&fit=crop'], 'High-quality stainless steel surgical scalpels. Sterile, disposable, ISO certified. Ideal for general surgery, biopsies, and tissue dissection.', ARRAY['Stainless Steel Blade','Ergonomic Handle','ISO 13485 Certified','Individually Wrapped','Sterile'], true, 'HOT', 'KieZ Med', true),
('Surgical Gloves – Latex (100pcs)', 'Surgical', 38000, 50000, 4.9, 567, 4500, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop', ARRAY['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=600&fit=crop','https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&h=600&fit=crop'], 'Powdered latex surgical gloves for maximum tactile sensitivity. Ambidextrous, sterile, available in sizes S/M/L/XL.', ARRAY['Latex Material','Powdered','Ambidextrous','CE Certified','Box of 100'], true, 'BEST SELLER', 'SafeTouch', false),
('Digital Blood Pressure Monitor', 'Diagnostics', 185000, 220000, 4.7, 389, 980, 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=400&h=400&fit=crop', ARRAY['https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&h=600&fit=crop','https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=600&fit=crop'], 'Automatic upper arm blood pressure monitor with large LCD display. Stores up to 60 readings, irregular heartbeat detection included.', ARRAY['Large LCD Display','60-Reading Memory','Irregular Heartbeat Alert','USB Powered','Dual Power'], true, 'NEW', 'Omron', true),
('Wound Dressing Kit – Sterile', 'Wound Care', 28000, 35000, 4.6, 145, 620, 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=400&fit=crop', ARRAY['https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=600&h=600&fit=crop'], 'Complete sterile wound dressing kit including gauze, bandages, antiseptic wipes, and adhesive tape. Ideal for clinics and first aid.', ARRAY['Sterile Packaging','Multiple Sizes','Adhesive Bandages','Antiseptic Wipes','Latex-Free'], true, NULL, 'MediKit', false),
('N95 Respirator Masks (20pcs)', 'PPE', 55000, 70000, 4.9, 892, 7800, 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400&h=400&fit=crop', ARRAY['https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=600&h=600&fit=crop'], 'NIOSH-approved N95 respirator masks with 95% filtration efficiency. Comfortable nose clip, adjustable straps, ideal for healthcare workers.', ARRAY['95% Filtration','NIOSH Approved','Adjustable Nose Clip','Latex-Free','Pack of 20'], true, 'HOT', '3M', true),
('IV Infusion Set (50pcs)', 'IV & Infusion', 72000, 90000, 4.7, 201, 1500, 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=400&h=400&fit=crop', ARRAY['https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=600&h=600&fit=crop'], 'Standard IV infusion administration sets with drip chamber, roller clamp, injection port and Luer lock connector. CE certified.', ARRAY['CE Certified','Luer Lock','Roller Clamp','Injection Port','Box of 50'], true, NULL, 'B. Braun', false),
('Pulse Oximeter – Fingertip', 'Diagnostics', 95000, 120000, 4.8, 445, 2300, 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop', ARRAY['https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=600&fit=crop'], 'Accurate SpO2 and heart rate monitoring in seconds. OLED display, auto power-off, lanyard included. Perfect for clinical and home use.', ARRAY['SpO2 + Heart Rate','OLED Display','Auto Power-Off','Lanyard Included','Batteries Included'], true, 'BEST SELLER', 'Contec', true),
('Disposable Syringes 5ml (100pcs)', 'Surgical', 32000, 45000, 4.5, 678, 5600, 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&h=400&fit=crop', ARRAY['https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&h=600&fit=crop'], 'Sterile 5ml disposable syringes with Luer slip or Luer lock. Individually packaged. Made of medical-grade polypropylene.', ARRAY['5ml Capacity','Sterile','Luer Lock','Individually Packed','Box of 100'], true, NULL, 'Terumo', false),
('Amoxicillin 500mg Capsules', 'Pharmacy', 12000, 15000, 4.8, 120, 500, 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop', ARRAY['https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=600&fit=crop'], 'Broad-spectrum antibiotic used to treat various bacterial infections.', ARRAY['Antibiotic','500mg','Box of 20'], true, 'POPULAR', 'GlaxoSmithKline', true),
('Paracetamol 500mg Tablets', 'Pharmacy', 5000, 7000, 4.9, 450, 2000, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop', ARRAY['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=600&fit=crop'], 'Effective pain reliever and fever reducer.', ARRAY['Analgesic','Antipyretic','Box of 100'], true, 'ESSENTIAL', 'Panadol', true),
('Cetirizine 10mg Tablets', 'Pharmacy', 8000, 10000, 4.7, 85, 300, 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop', ARRAY['https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=600&fit=crop'], 'Antihistamine used to treat allergy symptoms.', ARRAY['Antihistamine','10mg','Box of 30'], true, NULL, 'Zyrtec', false);
