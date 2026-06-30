ALTER TABLE peakhaven.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE peakhaven.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE peakhaven.inquiries ENABLE ROW LEVEL SECURITY;

-- Properties
CREATE POLICY "Public can view properties" ON peakhaven.properties FOR SELECT USING (true);
CREATE POLICY "Auth users can modify properties" ON peakhaven.properties USING (auth.role() = 'authenticated');

-- Bookings
CREATE POLICY "Public can insert bookings" ON peakhaven.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth users can view and modify bookings" ON peakhaven.bookings USING (auth.role() = 'authenticated');

-- Inquiries
CREATE POLICY "Public can insert inquiries" ON peakhaven.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth users can view and modify inquiries" ON peakhaven.inquiries USING (auth.role() = 'authenticated');
