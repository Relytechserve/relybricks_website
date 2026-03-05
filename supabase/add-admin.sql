-- Run this in Supabase SQL Editor to make yourself an admin
-- Replace 'your-email@example.com' with the email you use to sign in

INSERT INTO profiles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'prasanth@relytechserve.com'
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
