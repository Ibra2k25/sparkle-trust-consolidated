# Visual Guide - How Everything Works

## User Journey

```
┌─────────────────────────────────────────┐
│  Browser - User Opens App               │
│  http://localhost:3000                  │
└────────────────┬────────────────────────┘
                 │
        ┌────────▼────────┐
        │  Check Token    │
        │  in localStorage│
        └────────┬────────┘
                 │
         ┌───────┴────────┐
         │                │
    Has Token?        No Token?
    ✅                ❌
         │                │
         │         ┌──────▼────────┐
         │         │  Show Login    │
         │         │  Form          │
         │         │                │
         │         │  (app/page.tsx)│
         │         └──────┬────────┘
         │                │
         │         User enters:
         │         - Username
         │         - Password
         │                │
         │         ┌──────▼────────────┐
         │         │ Click Login       │
         │         │ Button            │
         │         └──────┬────────────┘
         │                │
         │         ┌──────▼────────────────────┐
         │         │ POST /api/login           │
         │         │ {"username":"...",        │
         │         │  "password":"..."}        │
         │         └──────┬───────────────────┘
         │                │
         │         ┌──────▼─────────────┐
         │         │ Server Validates   │
         │         │ Against ENV Vars   │
         │         └──────┬─────────────┘
         │                │
         │         ┌──────▼──────────────┐
         │         │ ✅ Valid?           │
         │         │ → Generate Token    │
         │         │ → Return to Client  │
         │         └──────┬──────────────┘
         │                │
         │         ┌──────▼────────────┐
         │         │ Save Token in     │
         │         │ localStorage      │
         │         └──────┬────────────┘
         │                │
         ├────────────────┤
         │                │
   ┌─────▼────────────────────────┐
   │  Redirect to Dashboard       │
   │  (/dashboard)               │
   │  (app/dashboard/page.tsx)    │
   └─────┬────────────────────────┘
         │
   ┌─────▼────────────────────────┐
   │  Dashboard Loads:            │
   │  • Fetch balances            │
   │  • Fetch transactions        │
   │  • Display UI                │
   │  • Auto-refresh every 5s     │
   └─────┬────────────────────────┘
         │
   ┌─────▼────────────────────────┐
   │  User sees:                  │
   │  • Total Balance             │
   │  • Primary Savings Account   │
   │  • Investment Portfolio      │
   │  • Transaction History       │
   └─────────────────────────────┘
```

## Component Structure

```
app/
├── page.tsx (Login Page)
│   └── <LoginForm>
│       ├── Username Input
│       ├── Password Input
│       └── Login Button
│           → calls lib/api.ts → login()
│
└── dashboard/page.tsx (Dashboard)
    ├── <TopNav>
    │   ├── Logo
    │   └── Logout Button
    │
    ├── Balance Section
    │   ├── <BalanceCard> (Total)
    │   ├── <BalanceCard> (Savings)
    │   └── <BalanceCard> (Investment)
    │       → uses lib/hooks.ts → useBalances()
    │
    └── Transactions Section
        └── <TransactionList>
            → uses lib/hooks.ts → useTransactions()
```

## Data Flow

### Login Flow
```
User Input
   ↓
LoginForm Component
   ↓
lib/api.ts → login()
   ↓
POST /api/login
   ↓
app/api/[...route]/route.ts
   ↓
Validate: process.env.AUTH_USERNAME
Validate: process.env.AUTH_PASSWORD
   ↓
Generate Token
Save to data.json
   ↓
Return { ok: true, token: "stc-..." }
   ↓
lib/api.ts → setToken()
   ↓
localStorage.setItem('auth_token', token)
   ↓
Router.push('/dashboard')
```

### Dashboard Data Flow
```
Dashboard Page Loads
   ↓
useBalances() Hook
   ↓
getToken() from localStorage
   ↓
GET /api/balances + Authorization header
   ↓
app/api/[...route]/route.ts
   ↓
Validate Token
Load data.json
Return balances
   ↓
Display in <BalanceCard>
   ↓
Auto-refresh every 5 seconds
```

## API Endpoint Map

```
Your App (Frontend)
        ↓
Next.js API Routes
(app/api/[...route]/route.ts)
        ↓
    ┌───┴────────────────────────────────┐
    │                                    │
POST /api/login              GET /api/balances
│                            │
├─ Body:                     ├─ Header:
│  {username, password}      │  Authorization: Bearer {token}
│                            │
├─ Returns:                  ├─ Returns:
│  {ok, token}               │  {ok, balances: {...}}
│                            │
└─ No auth required          └─ Requires valid token


POST /api/transactions       GET /api/transactions
│                            │
├─ Body:                     ├─ Header:
│  {description, amount...}  │  Authorization: Bearer {token}
│                            │
├─ Returns:                  ├─ Returns:
│  {ok, transactions: [...]} │  {ok, transactions: [...]}
│                            │
└─ Requires valid token      └─ Requires valid token
```

## File Relationships

```
User Views Login
    ↓
app/page.tsx imports
    ↓
components/login-form.tsx imports
    ↓
lib/api.ts → login() function imports
    ↓
app/api/[...route]/route.ts ← handles POST

User Clicks Login
    ↓
LoginForm calls lib/api.ts → login()
    ↓
lib/api.ts → POST to /api/login
    ↓
app/api/[...route]/route.ts processes
    ↓
Responds with token
    ↓
lib/api.ts → setToken() saves to localStorage
    ↓
Router redirects to /dashboard

User Views Dashboard
    ↓
app/dashboard/page.tsx imports
    ↓
components/top-nav.tsx
components/balance-card.tsx
components/transaction-list.tsx
    ↓
lib/hooks.ts → useBalances() / useTransactions()
    ↓
lib/api.ts → getBalances() / getTransactions()
    ↓
POST/GET to /api/balances and /api/transactions
    ↓
app/api/[...route]/route.ts handles
    ↓
data.json storage accessed
    ↓
Response sent back to components
    ↓
UI renders with data
```

## Environment Variables Flow

```
Development (.env.local)
    ↓
    AUTH_USERNAME=MabelHeath
    AUTH_PASSWORD=Heathmabel209@
    ↓
npm run dev
    ↓
process.env.AUTH_USERNAME ← available in code
process.env.AUTH_PASSWORD ← available in code


Production (Vercel)
    ↓
Vercel Dashboard → Settings → Environment Variables
    ↓
AUTH_USERNAME=MabelHeath
AUTH_PASSWORD=Heathmabel209@
    ↓
Vercel injects into runtime
    ↓
process.env.AUTH_USERNAME ← available in code
process.env.AUTH_PASSWORD ← available in code
```

## Deployment Process

```
Local Development (npm run dev)
         ↓
git add . && git commit
         ↓
git push origin main (to GitHub)
         ↓
GitHub receives push
         ↓
Go to vercel.com/new
         ↓
Select repository
         ↓
Vercel auto-detects Next.js
         ↓
Click Import
         ↓
Vercel builds:
├─ npm install
├─ npm run build
└─ Optimizes for production
         ↓
Click "Settings" → "Environment Variables"
         ↓
Add:
├─ AUTH_USERNAME=MabelHeath
└─ AUTH_PASSWORD=Heathmabel209@
         ↓
Click "Redeploy"
         ↓
Vercel rebuilds with env vars
         ↓
Deployment complete!
         ↓
Your app is live at: yourdomain.vercel.app
```

## Technology Stack Visualization

```
┌──────────────────────────────────────────┐
│         Vercel (Hosting)                 │
│                                          │
│  ┌─────────────────────────────────┐    │
│  │   Next.js 16 Framework          │    │
│  │                                 │    │
│  │  ┌──────────────┐              │    │
│  │  │  React 19    │              │    │
│  │  │  Components  │              │    │
│  │  └──────┬───────┘              │    │
│  │         │                      │    │
│  │  ┌──────▼──────────┐           │    │
│  │  │  TypeScript     │           │    │
│  │  │  Type Safety    │           │    │
│  │  └──────┬──────────┘           │    │
│  │         │                      │    │
│  │  ┌──────▼──────────┐           │    │
│  │  │  Tailwind CSS   │           │    │
│  │  │  Styling        │           │    │
│  │  └─────────────────┘           │    │
│  │         │                      │    │
│  │  ┌──────▼──────────┐           │    │
│  │  │  API Routes     │           │    │
│  │  │  Node.js Backend│           │    │
│  │  └──────┬──────────┘           │    │
│  │         │                      │    │
│  │  ┌──────▼──────────┐           │    │
│  │  │  data.json      │           │    │
│  │  │  File Storage   │           │    │
│  │  └─────────────────┘           │    │
│  └─────────────────────────────────┘    │
│                                          │
│  Connected to GitHub                    │
└──────────────────────────────────────────┘
```

## Authentication Flow Diagram

```
Browser                          Server

┌─────────────┐
│   No Token  │                  
└─────┬───────┘                  
      │                          
      │ User logs in             
      │                          
      ├────POST /api/login──────→ ┌──────────────┐
      │                          │ Validate     │
      │                          │ Credentials  │
      │                          └──────┬───────┘
      │                                 │
      │ ← ─ ─ Response + Token ─ ─ ─ ┌──┴───────┐
      │                          │Generate    │
      │ Save Token in localStorage   │Token    │
      │                          └─────────────┘
      │
      │ ┌─────────────┐
      │ │ Token Saved │
      │ └─────────────┘
      │
      │ GET /api/balances ────────→ ┌──────────────┐
      │ Authorization: Bearer xxx   │ Check Token  │
      │                          └──────┬───────┘
      │                                 │
      │ ← ─ ─ Response: Balances ─ ─ ┌──┴───────┐
      │                          │Load data  │
      │ Display on Dashboard     │from file  │
      │                          └─────────────┘
      │
      └─────────────────────────────
```

## Local vs. Production

```
LOCAL DEVELOPMENT              PRODUCTION (Vercel)
═══════════════════════════════════════════════════

npm run dev                    Vercel auto-builds
        ↓                               ↓
.env.local                    Environment Variables
        ↓                               ↓
Auth: process.env             Auth: process.env
        ↓                               ↓
data.json (file)              data.json (file)*
        ↓                               ↓
http://localhost:3000         https://yourapp.vercel.app
        ↓                               ↓
Full logs in terminal         Vercel Logs in Dashboard
        ↓                               ↓
Development mode              Production mode

*Note: File storage may reset on cold starts.
Upgrade to database for production persistence.
```

---

## Quick Reference

| Item | Local Dev | Production |
|------|-----------|------------|
| Server | npm run dev | Vercel |
| URL | localhost:3000 | yourapp.vercel.app |
| Env File | .env.local | Vercel Settings |
| Build | instant | ~2-3 min |
| Database | data.json | data.json* |

**Legend:**
- → = Data flows
- ↓ = Process continues
- ↑ = Response flows back

For more details, see the detailed guides: START_HERE.md, QUICK_START.md, DEPLOY_CHECKLIST.md
