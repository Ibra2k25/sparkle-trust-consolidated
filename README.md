# Sparkle Trust Consolidated

A modern, clean financial management application built with Next.js. Features authentication, real-time balance tracking, and transaction management with a fully integrated backend.

## Quick Start

**For detailed setup and deployment guide, see [QUICK_START.md](./QUICK_START.md)**

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local
echo "AUTH_USERNAME=MabelHeath
AUTH_PASSWORD=Heathmabel209@" > .env.local

# 3. Run development server
npm run dev

# 4. Open http://localhost:3000
```

Default login:
- **Username:** MabelHeath
- **Password:** Heathmabel209@

## Features

- **Clean Login System** - Token-based authentication
- **Live Dashboard** - Real-time balance and transaction updates
- **Multiple Accounts** - Primary Savings & Investment Portfolio
- **Transaction History** - Complete transaction log with categorization
- **Responsive Design** - Works on desktop and mobile
- **Production Ready** - Deploy to Vercel in minutes

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **Backend**: Next.js API Routes (Node.js)
- **Database**: JSON file storage (easily upgradeable)
- **Deployment**: Vercel (one-click deploy)

## Project Structure

```
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Login page
│   ├── dashboard/page.tsx        # Dashboard
│   ├── api/[...route]/route.ts   # Backend API (all endpoints)
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── login-form.tsx            # Login form
│   ├── top-nav.tsx               # Navigation bar
│   ├── balance-card.tsx          # Balance display
│   └── transaction-list.tsx      # Transactions
├── lib/
│   ├── api.ts                    # API client utilities
│   └── hooks.ts                  # Custom React hooks
├── data.json                     # Data storage
├── next.config.mjs               # Next.js config
├── tailwind.config.ts            # Tailwind config
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies
├── QUICK_START.md                # Detailed guide
└── .env.example                  # Environment template
```

## API Endpoints

All endpoints are in `app/api/[...route]/route.ts`:

### Authentication
- **POST** `/api/login`
  - Request: `{ username: string, password: string }`
  - Response: `{ ok: true, token: string }`

### Account Data (requires token)
- **GET** `/api/balances`
  - Response: `{ ok: true, balances: { "1": number, "2": number } }`

### Transactions (requires token)
- **GET** `/api/transactions`
  - Response: `{ ok: true, transactions: Transaction[] }`
- **POST** `/api/transactions`
  - Request: Transaction object
  - Response: `{ ok: true, transactions: Transaction[] }`

## Deploy to Vercel

### One-Click Deploy

1. **Push to GitHub** (if not already)
   ```bash
   git add . && git commit -m "Ready for deployment" && git push
   ```

2. **Go to Vercel**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel auto-detects it's a Next.js project

3. **Add Environment Variables**
   - Settings → Environment Variables
   - Add:
     - `AUTH_USERNAME` = `MabelHeath`
     - `AUTH_PASSWORD` = `Heathmabel209@`
   - Save and deploy

4. **Done!**
   - Your app is live at your Vercel URL

## Local Development

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local with your credentials (or use defaults)

# Run dev server
npm run dev
```

Visit `http://localhost:3000`

### Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run linter
```

## How It Works

### Authentication Flow
1. User enters credentials on login page
2. Frontend posts to `/api/login`
3. Server validates credentials against env vars
4. Server generates and returns a token
5. Token is stored in browser localStorage
6. Subsequent requests include token as `Authorization: Bearer {token}`

### Data Flow
- Backend loads/saves data from/to `data.json`
- Frontend fetches data with authentication
- Balances update every 5 seconds
- Transactions display in real-time

## Environment Variables

Create `.env.local` (development) or set in Vercel (production):

```
AUTH_USERNAME=MabelHeath
AUTH_PASSWORD=Heathmabel209@
```

## Security

- Credentials stored in environment variables (never in code)
- Tokens stored in secure localStorage
- Bearer token authentication
- Input validation
- HTTPS enforced in production

## Data Persistence

**Current**: JSON file storage
- Works great for development and demos
- Data persists between sessions
- May reset on serverless cold starts

**For Production**: Consider upgrading:
- **Supabase**: PostgreSQL + built-in auth (recommended)
- **MongoDB**: NoSQL with Vercel integration
- **AWS RDS**: Enterprise-grade relational database
- **Firebase**: Realtime database with auth

## Styling

Uses Tailwind CSS with custom design system:
- Mobile-first responsive
- Custom color scheme (blue-based)
- Smooth animations
- Accessible components

## Troubleshooting

**Login fails:**
- Check `.env.local` (dev) or Environment Variables (Vercel)
- Verify credentials are set correctly
- Check browser console for API errors

**Balances not loading:**
- Open DevTools → Network tab
- Check `/api/balances` response
- Verify token exists in localStorage

**Build errors:**
```bash
rm -rf node_modules .next
npm install
npm run build
```

## Next Steps

### Enhance the App
- Add transaction creation form
- Add filters and search
- Add data export (CSV, PDF)
- Add charts and analytics
- Add user profiles

### Upgrade Backend
- Replace JSON with real database
- Add data validation
- Add error logging
- Add rate limiting
- Add comprehensive API docs

## License

MIT

## Support

1. See [QUICK_START.md](./QUICK_START.md) for detailed guide
2. Check console logs for errors
3. Review API responses in Network tab
4. Verify all environment variables are set
5. For Vercel issues, check project settings

---

**Built with Next.js • Ready for Vercel • Production Ready**
