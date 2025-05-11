/*
  # Roadmap táblák létrehozása

  1. Új táblák
    - `topics`
      - `id` (uuid, elsődleges kulcs)
      - `user_id` (uuid, külső kulcs az auth.users táblához)
      - `original_topic_text` (text)
      - `created_at` (timestamptz)
    - `modules`
      - `id` (uuid, elsődleges kulcs)
      - `topic_id` (uuid, külső kulcs a topics táblához)
      - `parent_module_id` (uuid, külső kulcs a modules táblához)
      - `title` (text)
      - `description` (text)
      - `order_in_parent` (integer)
      - `created_at` (timestamptz)

  2. Biztonság
    - RLS engedélyezése mindkét táblán
    - Szabályok hozzáadása a felhasználói hozzáféréshez
*/

-- Topics tábla létrehozása
CREATE TABLE IF NOT EXISTS topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  original_topic_text text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Modules tábla létrehozása
CREATE TABLE IF NOT EXISTS modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid REFERENCES topics(id) ON DELETE CASCADE,
  parent_module_id uuid REFERENCES modules(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  order_in_parent integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- RLS engedélyezése
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;

-- Topics RLS szabályok
CREATE POLICY "Users can read own topics"
  ON topics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own topics"
  ON topics
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Modules RLS szabályok
CREATE POLICY "Users can read modules of own topics"
  ON modules
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM topics
      WHERE topics.id = modules.topic_id
      AND topics.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert modules for own topics"
  ON modules
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM topics
      WHERE topics.id = modules.topic_id
      AND topics.user_id = auth.uid()
    )
  );