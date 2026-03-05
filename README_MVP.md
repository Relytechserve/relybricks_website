# RelyBricks MVP Setup

## 1. Supabase Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) and create a project
2. Copy your **Project URL** and **anon key** from Settings > API
3. Add to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. In Supabase SQL Editor, run the schema: `supabase/schema.sql`
5. In Supabase Auth > URL Configuration, add:
   - Site URL: `http://localhost:3001` (dev) or your production URL
   - Redirect URLs: `http://localhost:3001/auth/callback`, `https://yoursite.com/auth/callback`

## 2. RelyBricks Website (Customer Portal)

```bash
cd RelyBricks_website
npm install
cp .env.example .env.local
# Edit .env.local with Supabase keys
npm run dev
```

- **Register**: /register
- **Login**: /login (magic link)
- **Dashboard**: /dashboard (Documents, Updates, Transactions)

## 3. Admin Portal

```bash
cd relybricks-admin
npm install
# Add .env.local with same Supabase keys
npm run dev
```

Runs on port 3000 by default. Dashboard and Customers pages coming next.

## 4. Folder Structure

```
RelyTech_Projects/
├── RelyBricks_website/   # Marketing + Customer Portal (port 3001)
└── relybricks-admin/     # Admin Portal (port 3000)
```
