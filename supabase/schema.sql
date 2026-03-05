-- RelyBricks Supabase Schema (MVP)
-- Run this in Supabase SQL Editor after creating your project

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Customers: main customer/owner record
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  preferred_contact TEXT CHECK (preferred_contact IN ('email', 'whatsapp', 'both')),
  -- Residing address (communication/contract)
  residing_street TEXT,
  residing_city TEXT,
  residing_state TEXT,
  residing_country TEXT,
  residing_pincode TEXT,
  -- Property address
  property_city TEXT,
  property_area TEXT,
  property_full_address TEXT,
  property_type TEXT CHECK (property_type IN ('apartment', 'villa', 'bungalow', 'land')),
  property_sqft INTEGER,
  property_status TEXT CHECK (property_status IN ('Occupied', 'Vacant')),
  -- Plan & status
  plan_type TEXT CHECK (plan_type IN ('Basic', 'Gold', 'Premium', 'Custom')),
  status TEXT NOT NULL CHECK (status IN ('Active', 'Inactive', 'Prospect')) DEFAULT 'Prospect',
  renewal_status TEXT,
  renewal_date DATE,
  next_renewal_date DATE,
  subscription_date DATE,
  package_revenue NUMERIC,
  billed_amount NUMERIC,
  working_cost NUMERIC,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profiles: links auth.users to roles
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('customer', 'admin')) DEFAULT 'customer',
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customer documents (files in Storage, metadata here)
CREATE TABLE customer_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Property updates (announcements/updates for customer)
CREATE TABLE property_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transactions (renewals, payments)
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('renewal', 'payment', 'other')),
  amount NUMERIC,
  description TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin invites (email invite only)
CREATE TABLE admin_invites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  invited_by UUID REFERENCES auth.users(id),
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_customers_auth_user_id ON customers(auth_user_id);
CREATE INDEX idx_customers_status ON customers(status);
CREATE INDEX idx_customers_next_renewal ON customers(next_renewal_date);
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_customer_documents_customer ON customer_documents(customer_id);
CREATE INDEX idx_property_updates_customer ON property_updates(customer_id);
CREATE INDEX idx_transactions_customer ON transactions(customer_id);

-- RLS (Row Level Security) - enable on all tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_invites ENABLE ROW LEVEL SECURITY;

-- Policies (basic - will refine)
-- Customers: admins see all, customers see only own
CREATE POLICY "Admins can do all on customers" ON customers
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Customers can read own" ON customers
  FOR SELECT USING (auth_user_id = auth.uid());

CREATE POLICY "Customers can update own" ON customers
  FOR UPDATE USING (auth_user_id = auth.uid());

-- Profiles: users can read own
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (user_id = auth.uid());

-- Customer documents: admins all, customers own
CREATE POLICY "Admins all on customer_documents" ON customer_documents
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Customers read own documents" ON customer_documents
  FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE auth_user_id = auth.uid())
  );

-- Property updates: same pattern
CREATE POLICY "Admins all on property_updates" ON property_updates
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Customers read own updates" ON property_updates
  FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE auth_user_id = auth.uid())
  );

-- Transactions: same pattern
CREATE POLICY "Admins all on transactions" ON transactions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Customers read own transactions" ON transactions
  FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE auth_user_id = auth.uid())
  );

-- Admin invites: admins only
CREATE POLICY "Admins manage admin_invites" ON admin_invites
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
  );
