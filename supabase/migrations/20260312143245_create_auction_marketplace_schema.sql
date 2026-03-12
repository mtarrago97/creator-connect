/*
  # Auctio Marketplace Database Schema

  ## Tables Created
  
  ### 1. profiles
    - `id` (uuid, primary key) - References auth.users
    - `email` (text, unique) - User email
    - `full_name` (text) - User's full name
    - `avatar_url` (text) - Profile picture URL
    - `is_creator` (boolean) - Whether user is a verified creator
    - `bio` (text) - User biography
    - `created_at` (timestamptz) - Account creation timestamp
    - `updated_at` (timestamptz) - Last update timestamp

  ### 2. categories
    - `id` (uuid, primary key)
    - `name` (text, unique) - Category name (Fashion, Art, Music, etc.)
    - `slug` (text, unique) - URL-friendly slug
    - `created_at` (timestamptz)

  ### 3. auctions
    - `id` (uuid, primary key)
    - `creator_id` (uuid) - References profiles
    - `title` (text) - Auction title
    - `description` (text) - Full description
    - `category_id` (uuid) - References categories
    - `auction_type` (text) - 'object' or 'experience'
    - `starting_bid` (numeric) - Starting bid amount
    - `current_bid` (numeric) - Current highest bid
    - `buy_now_price` (numeric, nullable) - Optional buy-now price
    - `bid_count` (integer) - Number of bids placed
    - `watcher_count` (integer) - Number of users watching
    - `status` (text) - 'draft', 'live', 'ended', 'cancelled'
    - `start_time` (timestamptz) - Auction start time
    - `end_time` (timestamptz) - Auction end time
    - `featured_image` (text) - Main image URL
    - `images` (jsonb) - Array of additional images
    - `metadata` (jsonb) - Additional metadata
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  ### 4. bids
    - `id` (uuid, primary key)
    - `auction_id` (uuid) - References auctions
    - `bidder_id` (uuid) - References profiles
    - `amount` (numeric) - Bid amount
    - `is_auto_bid` (boolean) - Whether this was an automatic bid
    - `created_at` (timestamptz)

  ### 5. watchlist
    - `id` (uuid, primary key)
    - `user_id` (uuid) - References profiles
    - `auction_id` (uuid) - References auctions
    - `created_at` (timestamptz)

  ### 6. payments
    - `id` (uuid, primary key)
    - `auction_id` (uuid) - References auctions
    - `buyer_id` (uuid) - References profiles
    - `seller_id` (uuid) - References profiles
    - `amount` (numeric) - Payment amount
    - `payment_method` (text) - Payment method used
    - `status` (text) - 'pending', 'completed', 'failed', 'refunded'
    - `transaction_id` (text) - External payment processor ID
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  ### 7. search_history
    - `id` (uuid, primary key)
    - `user_id` (uuid) - References profiles
    - `query` (text) - Search query
    - `filters` (jsonb) - Applied filters
    - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Policies for authenticated users to manage their own data
  - Public read access for auctions and categories
  - Bidders can only see their own bids
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  is_creator boolean DEFAULT false,
  bio text,
  follower_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO authenticated
  USING (true);

-- Create auctions table
CREATE TABLE IF NOT EXISTS auctions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  category_id uuid REFERENCES categories(id),
  auction_type text NOT NULL CHECK (auction_type IN ('object', 'experience')),
  starting_bid numeric(10,2) NOT NULL DEFAULT 0,
  current_bid numeric(10,2) NOT NULL DEFAULT 0,
  buy_now_price numeric(10,2),
  bid_count integer DEFAULT 0,
  watcher_count integer DEFAULT 0,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'live', 'ended', 'cancelled', 'sold')),
  start_time timestamptz NOT NULL DEFAULT now(),
  end_time timestamptz NOT NULL,
  featured_image text,
  images jsonb DEFAULT '[]'::jsonb,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE auctions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view live auctions"
  ON auctions FOR SELECT
  TO authenticated
  USING (status = 'live' OR status = 'ended');

CREATE POLICY "Creators can view own auctions"
  ON auctions FOR SELECT
  TO authenticated
  USING (creator_id = auth.uid());

CREATE POLICY "Creators can insert own auctions"
  ON auctions FOR INSERT
  TO authenticated
  WITH CHECK (creator_id = auth.uid());

CREATE POLICY "Creators can update own auctions"
  ON auctions FOR UPDATE
  TO authenticated
  USING (creator_id = auth.uid())
  WITH CHECK (creator_id = auth.uid());

-- Create bids table
CREATE TABLE IF NOT EXISTS bids (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auction_id uuid REFERENCES auctions(id) ON DELETE CASCADE NOT NULL,
  bidder_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  amount numeric(10,2) NOT NULL,
  is_auto_bid boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bids ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bids"
  ON bids FOR SELECT
  TO authenticated
  USING (bidder_id = auth.uid());

CREATE POLICY "Auction creators can view bids on their auctions"
  ON bids FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auctions
      WHERE auctions.id = bids.auction_id
      AND auctions.creator_id = auth.uid()
    )
  );

CREATE POLICY "Users can place bids"
  ON bids FOR INSERT
  TO authenticated
  WITH CHECK (bidder_id = auth.uid());

-- Create watchlist table
CREATE TABLE IF NOT EXISTS watchlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  auction_id uuid REFERENCES auctions(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, auction_id)
);

ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own watchlist"
  ON watchlist FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can add to watchlist"
  ON watchlist FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can remove from watchlist"
  ON watchlist FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auction_id uuid REFERENCES auctions(id) ON DELETE CASCADE NOT NULL,
  buyer_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  seller_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  amount numeric(10,2) NOT NULL,
  payment_method text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  transaction_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payments as buyer"
  ON payments FOR SELECT
  TO authenticated
  USING (buyer_id = auth.uid());

CREATE POLICY "Users can view own payments as seller"
  ON payments FOR SELECT
  TO authenticated
  USING (seller_id = auth.uid());

-- Create search_history table
CREATE TABLE IF NOT EXISTS search_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  query text NOT NULL,
  filters jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own search history"
  ON search_history FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can add search history"
  ON search_history FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES
  ('Fashion', 'fashion', 'Sneakers, clothing, and fashion items'),
  ('Art', 'art', 'Original artwork and prints'),
  ('Music', 'music', 'Instruments, vinyl, and music experiences'),
  ('Collectibles', 'collectibles', 'Rare and vintage collectibles'),
  ('Sports', 'sports', 'Sports memorabilia and experiences'),
  ('Culinary', 'culinary', 'Food experiences and culinary items'),
  ('Experiences', 'experiences', 'Unique experiences and events')
ON CONFLICT (slug) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_auctions_status ON auctions(status);
CREATE INDEX IF NOT EXISTS idx_auctions_end_time ON auctions(end_time);
CREATE INDEX IF NOT EXISTS idx_auctions_creator ON auctions(creator_id);
CREATE INDEX IF NOT EXISTS idx_bids_auction ON bids(auction_id);
CREATE INDEX IF NOT EXISTS idx_bids_bidder ON bids(bidder_id);
CREATE INDEX IF NOT EXISTS idx_watchlist_user ON watchlist(user_id);
CREATE INDEX IF NOT EXISTS idx_watchlist_auction ON watchlist(auction_id);
