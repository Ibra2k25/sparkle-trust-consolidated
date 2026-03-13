# Sparkle Trust Consolidated

A secure financial management platform with a modern, responsive interface.

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📦 Features

- Secure authentication with environment-based credentials
- Real-time balance tracking
- Transaction history management
- Multi-account support (Primary Savings & Investment Portfolio)
- Quick action buttons
- Transaction send/exchange functionality
- Responsive mobile-first design

## 🔐 Security

- Credentials stored in environment variables (not hardcoded)
- Token-based API authentication
- CORS protection enabled
- Sensitive data excluded from version control via `.gitignore`

## 🌐 Deployment to Vercel

### Prerequisites
- GitHub repository connected
- Vercel account

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com/dashboard)
   - Click "New Project"
   - Select your repository
   - Click "Deploy"

3. **Add Environment Variables**
   - In Vercel Dashboard → Project Settings → Environment Variables
   - Add:
     - `AUTH_USERNAME` = `MabelHeath`
     - `AUTH_PASSWORD` = `Heathmabel209@`
   - Redeploy

### Using Vercel CLI

```bash
npm install -g vercel
vercel --prod
```

## 📋 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `AUTH_USERNAME` | Login username | Yes |
| `AUTH_PASSWORD` | Login password | Yes |
| `PORT` | Server port (default: 3000) | No |

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── public/                # Static assets
├── data.json             # Transaction data store
├── server.js             # Legacy Express server
├── package.json          # Dependencies
├── next.config.mjs       # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── DEPLOY.md             # Detailed deployment guide
```

## ✨ What Was Fixed

- ✅ Moved credentials to environment variables
- ✅ Added proper Next.js configuration
- ✅ Created API routes for backend functionality
- ✅ Added TypeScript support
- ✅ Configured Tailwind CSS
- ✅ Set up Vercel deployment configuration
- ✅ Added comprehensive `.gitignore`
- ✅ Created environment variable template
- ✅ Organized project structure

## 📝 Notes

- The application uses Next.js 16 with React 19
- API endpoints are available at `/api/[endpoint]`
- Data is persisted in `data.json` file
- For production, use environment variables for all sensitive configuration

## 📖 For More Information

See `DEPLOY.md` for detailed deployment instructions.

## 📄 License

This project is private and proprietary.
