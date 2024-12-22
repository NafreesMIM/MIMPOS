/*
  # Create Superadmin User

  1. Changes
    - Creates a superadmin user with credentials:
      Username: admin@mimpos.com
      Password: MimPos@2024!
    - Assigns superadmin role and permissions

  2. Security
    - Password is hashed using Supabase Auth
    - User is created with full system access
*/

-- Create the superadmin user
INSERT INTO auth.users (
  email,
  encrypted_password,
  email_confirmed_at,
  role
) VALUES (
  'admin@mimpos.com',
  crypt('MimPos@2024!', gen_salt('bf')),
  now(),
  'authenticated'
);

-- Set custom claims for superadmin role
UPDATE auth.users
SET raw_app_meta_data = jsonb_build_object(
  'role', 'super_admin',
  'permissions', ARRAY['all']
)
WHERE email = 'admin@mimpos.com';