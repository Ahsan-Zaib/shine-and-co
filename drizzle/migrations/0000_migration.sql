CREATE TABLE public.booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  request_type text NOT NULL CHECK (request_type IN ('booking','quote')),
  service text NOT NULL CHECK (char_length(service) <= 60),
  property_type text CHECK (char_length(property_type) <= 40),
  bedrooms int CHECK (bedrooms BETWEEN 0 AND 20),
  bathrooms int CHECK (bathrooms BETWEEN 0 AND 20),
  frequency text NOT NULL DEFAULT 'one-time' CHECK (frequency IN ('weekly','biweekly','monthly','one-time')),
  addons text[] NOT NULL DEFAULT '{}',
  preferred_date date,
  preferred_time text CHECK (char_length(preferred_time) <= 20),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 5 AND 30),
  address text CHECK (char_length(address) <= 300),
  notes text CHECK (char_length(notes) <= 1000),
  estimated_price numeric
);
GRANT INSERT ON public.booking_requests TO anon, authenticated;
GRANT ALL ON public.booking_requests TO service_role;
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit booking requests" ON public.booking_requests FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  phone text CHECK (char_length(phone) <= 30),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  service text CHECK (char_length(service) <= 60),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 1000)
);
GRANT INSERT ON public.contact_submissions TO anon, authenticated;
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact messages" ON public.contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);