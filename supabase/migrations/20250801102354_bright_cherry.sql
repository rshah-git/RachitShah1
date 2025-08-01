/*
  # Newsletter Subscribers Database

  1. New Tables
    - `subscribers`
      - `id` (uuid, primary key)
      - `first_name` (text, required)
      - `last_name` (text, required) 
      - `email` (text, unique, required)
      - `subscribed_at` (timestamp)
      - `is_active` (boolean, default true)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `subscribers` table
    - Add policy for authenticated users to manage subscribers
    - Add policy for public signup access
*/

CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public signup
CREATE POLICY "Allow public signup"
  ON subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read all subscribers
CREATE POLICY "Authenticated users can read subscribers"
  ON subscribers
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update subscribers
CREATE POLICY "Authenticated users can update subscribers"
  ON subscribers
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_active ON subscribers(is_active);