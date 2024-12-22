/*
  # Initial MIM POS Database Schema

  1. New Tables
    - `shops`
      - Core shop information
      - Subscription and settings
    - `users`
      - User authentication and profile
      - Role-based access control
    - `products`
      - Product catalog
      - Inventory tracking
    - `categories`
      - Product categorization
    - `inventory`
      - Stock management
      - Multi-location support
    - `sales`
      - Sales transactions
    - `sale_items`
      - Individual items in sales
    
  2. Security
    - RLS enabled on all tables
    - Policies for each user role
*/

-- Shops table
CREATE TABLE shops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  address text,
  city text,
  country text,
  owner_id uuid REFERENCES auth.users(id),
  subscription_plan text NOT NULL DEFAULT 'basic',
  subscription_status text NOT NULL DEFAULT 'active',
  subscription_expires_at timestamptz,
  currency text NOT NULL DEFAULT 'USD',
  timezone text NOT NULL DEFAULT 'UTC',
  language text NOT NULL DEFAULT 'en',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE shops ENABLE ROW LEVEL SECURITY;

-- Categories table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id uuid REFERENCES shops(id) NOT NULL,
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Products table
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id uuid REFERENCES shops(id) NOT NULL,
  category_id uuid REFERENCES categories(id),
  name text NOT NULL,
  description text,
  sku text,
  barcode text,
  price decimal(10,2) NOT NULL DEFAULT 0,
  cost_price decimal(10,2) NOT NULL DEFAULT 0,
  tax_rate decimal(5,2) DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Inventory table
CREATE TABLE inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id uuid REFERENCES shops(id) NOT NULL,
  product_id uuid REFERENCES products(id) NOT NULL,
  quantity integer NOT NULL DEFAULT 0,
  min_quantity integer DEFAULT 0,
  location text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

-- Sales table
CREATE TABLE sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id uuid REFERENCES shops(id) NOT NULL,
  cashier_id uuid REFERENCES auth.users(id) NOT NULL,
  total_amount decimal(10,2) NOT NULL DEFAULT 0,
  tax_amount decimal(10,2) NOT NULL DEFAULT 0,
  discount_amount decimal(10,2) NOT NULL DEFAULT 0,
  payment_method text NOT NULL,
  payment_status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE sales ENABLE ROW LEVEL SECURITY;

-- Sale items table
CREATE TABLE sale_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id uuid REFERENCES sales(id) NOT NULL,
  product_id uuid REFERENCES products(id) NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  unit_price decimal(10,2) NOT NULL,
  total_price decimal(10,2) NOT NULL,
  tax_amount decimal(10,2) NOT NULL DEFAULT 0,
  discount_amount decimal(10,2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sale_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Shops policies
CREATE POLICY "Users can view their own shops"
  ON shops FOR SELECT
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Owners can update their own shops"
  ON shops FOR UPDATE
  TO authenticated
  USING (owner_id = auth.uid());

-- Categories policies
CREATE POLICY "Users can view categories of their shops"
  ON categories FOR SELECT
  TO authenticated
  USING (
    shop_id IN (
      SELECT id FROM shops WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage categories of their shops"
  ON categories FOR ALL
  TO authenticated
  USING (
    shop_id IN (
      SELECT id FROM shops WHERE owner_id = auth.uid()
    )
  );

-- Products policies
CREATE POLICY "Users can view products of their shops"
  ON products FOR SELECT
  TO authenticated
  USING (
    shop_id IN (
      SELECT id FROM shops WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage products of their shops"
  ON products FOR ALL
  TO authenticated
  USING (
    shop_id IN (
      SELECT id FROM shops WHERE owner_id = auth.uid()
    )
  );

-- Inventory policies
CREATE POLICY "Users can view inventory of their shops"
  ON inventory FOR SELECT
  TO authenticated
  USING (
    shop_id IN (
      SELECT id FROM shops WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage inventory of their shops"
  ON inventory FOR ALL
  TO authenticated
  USING (
    shop_id IN (
      SELECT id FROM shops WHERE owner_id = auth.uid()
    )
  );

-- Sales policies
CREATE POLICY "Users can view sales of their shops"
  ON sales FOR SELECT
  TO authenticated
  USING (
    shop_id IN (
      SELECT id FROM shops WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage sales of their shops"
  ON sales FOR ALL
  TO authenticated
  USING (
    shop_id IN (
      SELECT id FROM shops WHERE owner_id = auth.uid()
    )
  );

-- Sale items policies
CREATE POLICY "Users can view sale items of their shops"
  ON sale_items FOR SELECT
  TO authenticated
  USING (
    sale_id IN (
      SELECT s.id FROM sales s
      JOIN shops sh ON s.shop_id = sh.id
      WHERE sh.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage sale items of their shops"
  ON sale_items FOR ALL
  TO authenticated
  USING (
    sale_id IN (
      SELECT s.id FROM sales s
      JOIN shops sh ON s.shop_id = sh.id
      WHERE sh.owner_id = auth.uid()
    )
  );