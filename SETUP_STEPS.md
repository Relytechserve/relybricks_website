# Setup Steps – Do These Manually

Some steps require access to your Supabase and Google accounts. Complete these in order:

---

## Step 1: Run the database schema in Supabase

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project
2. Go to **SQL Editor**
3. Open `RelyBricks_website/supabase/schema.sql` in your editor
4. Copy the full contents
5. Paste into the Supabase SQL Editor
6. Click **Run**

---

## Step 2: Add the service role key for the seed script

1. In Supabase Dashboard → **Settings** → **API**
2. Copy the **service_role** key (under "Project API keys")
3. Open `RelyBricks_website/.env.local`
4. Add this line (use your real key):

```
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

---

## Step 3: Seed customer data (choose one method)

### Option A: From Google Sheet (if publicly shared)

1. In Google Sheets: **Share** → **General access** → **Anyone with the link** (Viewer)
2. Run:

```bash
cd RelyBricks_website
node scripts/seed-from-sheet.mjs
```

### Option B: From a local CSV (if the sheet is not public)

1. In Google Sheets: **File** → **Download** → **Comma-separated values (.csv)**
2. Save the file as `RelyBricks_website/scripts/customers.csv`
3. Run:

```bash
cd RelyBricks_website
node scripts/seed-from-csv.mjs
```

---

## Step 4: Configure Auth redirect URLs in Supabase

1. Supabase Dashboard → **Authentication** → **URL Configuration**
2. Set **Site URL** to: `http://localhost:3001` (or your production URL)
3. Add these to **Redirect URLs**:
   - `http://localhost:3001/auth/callback`
   - `http://localhost:3002/auth/callback`
   - Add production URLs when you deploy

---

## Step 5: Run the apps

**Website (port 3001):**
```bash
cd RelyBricks_website
npm run dev
```

**Admin (port 3002):**
```bash
cd relybricks-admin
npm run dev
```

- Website: http://localhost:3001  
- Admin: http://localhost:3002
