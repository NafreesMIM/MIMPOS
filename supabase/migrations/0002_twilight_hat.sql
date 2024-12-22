/*
  # Create Superadmin User

  1. Changes
    - Creates a superadmin user with credentials:
      Email: admin@mimpos.com
      Password: MimPos@2024!
    - Assigns superadmin role and permissions

  2. Security
    - Password is hashed using Supabase Auth
    - User is created with full system access
*/

-- Create the superadmin user with a generated UUID
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  role,
  aud,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmed_at
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'admin@mimpos.com',
  crypt('MimPos@2024!', gen_salt('bf')),
  now(),
  'authenticated',
  'authenticated',
  now(),
  now(),
  jsonb_build_object(
    'role', 'super_admin',
    'permissions', ARRAY['all']
  ),
  '{}',
  true,
  now()
);