# Sparkle Trust Consolidated - Quick Start Guide

## Overview
This is a modern Next.js financial management application with a clean React frontend and a Node.js backend API integrated into the same application.

## Project Structure
```
.
├── app/
│   ├── page.tsx           # Login page
│   ├── dashboard/
│   │   └── page.tsx       # Dashboard page
│   ├── api/
│   │   └── [...route]/    # Backend API routes
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── login-form.tsx
│   ├── top-nav.tsx
│   ├── balance-card.tsx
│   └── transaction-list.tsx
├── lib/
│   ├── api.ts            # API client utilities
│   └── hooks.ts          # Custom React hooks
├── data.json             # JSON database (local storage)
└── package.json          # Dependencies
```

## Local Development

### 1. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Set Environment Variables
Create a `.env.local` file in the root directory:
```
AUTH_USERNAME=MabelHeath
AUTH_PASSWORD=Heathmabel209@
```

### 3. Run Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The app will be available at `http://localhost:3000`

### 4. Login
Use the credentials from your `.env.local` file:
- **Username:** MabelHeath
- **Password:** Heathmabel209@

## How It Works

### Frontend
- **Login Page** (`/`): Authentication form that stores token in localStorage
- **Dashboard** (`/dashboard`): Shows balances and transactions
- Components are modular and reusable

### Backend API
All API endpoints are in `app/api/[...route]/route.ts`:
- `POST /api/login` - Authenticate and get token
- `GET /api/balances` - Get account balances (requires auth)
- `GET /api/transactions` - List transactions (requires auth)
- `POST /api/transactions` - Add new transaction (requires auth)

### Data Storage
Data is stored in `data.json` (local file):
- Tokens (for session management)
- Account balances
- Transactions

## Deploy to Vercel

### Option 1: Quick Deploy (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your GitHub repository
   - Click "Import"

3. **Add Environment Variables**
   - After import, go to Settings → Environment Variables
   - Add:
     - `AUTH_USERNAME` = `MabelHeath`
     - `AUTH_PASSWORD` = `Heathmabel209@`
   - Click "Save"

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (usually 2-3 minutes)

### Option 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts and add environment variables when asked
```

## Important Notes

### Data Persistence
- **Local Development**: Data is stored in `data.json`
- **Vercel Deployment**: Data persists during the request but may reset on serverless cold starts
- **For Production**: Consider upgrading to a real database (Supabase, MongoDB, etc.)

### Security
- Never commit `.env.local` to git
- Credentials are read from environment variables
- Tokens are stored in browser localStorage
- Always use HTTPS in production

### Authentication Flow
1. User enters credentials on login page
2. Frontend calls `POST /api/login`
3. Server validates credentials against `AUTH_USERNAME` and `AUTH_PASSWORD` env vars
4. Server returns a token
5. Token is stored in localStorage
6. Subsequent API calls include token in `Authorization: Bearer {token}` header

## Troubleshooting

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Next.js cache: `rm -rf .next && npm run build`

### Login Fails
- Check `.env.local` (local dev) or Environment Variables (Vercel)
- Ensure `AUTH_USERNAME` and `AUTH_PASSWORD` are set
- Try default credentials: `user` / `password`

### Balances Not Showing
- Ensure you're authenticated (token in localStorage)
- Check browser console for API errors
- Verify `data.json` exists and is readable

## Next Steps

### Enhance Features
- Add transaction creation form
- Add data export (CSV, PDF)
- Add charts and analytics
- Add multi-user support
- Add real database integration

### Upgrade to Production Database
Replace `data.json` with:
- **Supabase**: PostgreSQL database with built-in auth
- **MongoDB**: NoSQL database
- **AWS RDS**: Managed relational database
- **Prisma ORM**: Database agnostic ORM

See our database integration guides for more details.

## Support
- Check console for errors: Right-click → Inspect → Console tab
- Review API responses in Network tab
- Ensure all environment variables are set correctly
