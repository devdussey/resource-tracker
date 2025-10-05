/*
  # Resource Monitor Widget Configurations Schema

  1. New Tables
    - `widget_configs`
      - `id` (uuid, primary key) - Unique identifier for each widget configuration
      - `user_id` (uuid, nullable) - User identifier for multi-user support
      - `widget_type` (text) - Type of widget (cpu, memory, network, disk)
      - `enabled` (boolean) - Whether the widget is active
      - `display_interval` (integer) - How often to show the widget in seconds
      - `display_duration` (integer) - How long to display the widget in seconds
      - `position` (text) - Widget position on screen (top-left, top-right, bottom-left, bottom-right)
      - `theme` (text) - Visual theme (dark, light, glass, neon)
      - `created_at` (timestamptz) - When the config was created
      - `updated_at` (timestamptz) - When the config was last updated

  2. Security
    - Enable RLS on `widget_configs` table
    - Add policy for public read access (single-user app for now)
    - Add policy for public insert/update/delete access
*/

CREATE TABLE IF NOT EXISTS widget_configs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  widget_type text NOT NULL,
  enabled boolean DEFAULT true,
  display_interval integer DEFAULT 60,
  display_duration integer DEFAULT 5,
  position text DEFAULT 'bottom-right',
  theme text DEFAULT 'glass',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE widget_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to widget_configs"
  ON widget_configs
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert access to widget_configs"
  ON widget_configs
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update access to widget_configs"
  ON widget_configs
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access to widget_configs"
  ON widget_configs
  FOR DELETE
  USING (true);

-- Insert default configurations
INSERT INTO widget_configs (widget_type, enabled, display_interval, display_duration, position, theme)
VALUES 
  ('cpu', true, 60, 5, 'top-right', 'glass'),
  ('memory', true, 60, 5, 'top-left', 'glass'),
  ('network', false, 60, 5, 'bottom-left', 'glass')
ON CONFLICT DO NOTHING;