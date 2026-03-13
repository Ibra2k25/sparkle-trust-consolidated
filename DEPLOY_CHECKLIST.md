# Deployment Checklist

Complete these steps to deploy your app to Vercel in 5 minutes.

## Pre-Deployment (Local)

- [ ] Run `npm install` to install all dependencies
- [ ] Test locally: `npm run dev` and verify login works
- [ ] Test with correct credentials from `.env.local`
- [ ] Run `npm run build` and verify it completes without errors
- [ ] Check that all console errors are gone
- [ ] Verify `.gitignore` includes `.env.local` (never commit sensitive data)

## Git Setup

- [ ] Commit all changes:
  ```bash
  git add .
  git commit -m "Production ready: clean React frontend, integrated backend"
  ```
- [ ] Push to GitHub:
  ```bash
  git push origin main
  ```
- [ ] Verify changes appear on GitHub repository

## Vercel Deployment

### Option A: Using Vercel Dashboard (Easiest)

1. [ ] Go to https://vercel.com/dashboard
2. [ ] Click "New Project"
3. [ ] Select your GitHub repository
4. [ ] Click "Import"
5. [ ] Wait for auto-detection (should detect Next.js)
6. [ ] Leave build settings as default
7. [ ] Click "Deploy"
8. [ ] Wait for build to complete (2-3 minutes)

### Option B: Using Vercel CLI

1. [ ] Install Vercel CLI: `npm install -g vercel`
2. [ ] Run: `vercel --prod`
3. [ ] Follow interactive prompts
4. [ ] Wait for deployment

## Post-Deployment Configuration

1. [ ] In Vercel Dashboard, open your project
2. [ ] Go to "Settings" → "Environment Variables"
3. [ ] Add environment variables:
   - Name: `AUTH_USERNAME` | Value: `MabelHeath`
   - Name: `AUTH_PASSWORD` | Value: `Heathmabel209@`
4. [ ] Click "Save"
5. [ ] Go to "Deployments" and click "Redeploy" on latest deployment
6. [ ] Wait for redeployment to complete

## Verification

1. [ ] Click the Vercel deployment URL
2. [ ] Login with credentials:
   - Username: `MabelHeath`
   - Password: `Heathmabel209@`
3. [ ] Verify you see the Dashboard with:
   - [ ] Total Balance displayed
   - [ ] Primary Savings account
   - [ ] Investment Portfolio account
   - [ ] Transaction list populated
4. [ ] Navigate around the app
5. [ ] Test logout button
6. [ ] Verify login page appears after logout

## Troubleshooting

### Build Fails
- Check Vercel build logs for errors
- Ensure all dependencies are in `package.json`
- Run `npm run build` locally to test

### Login Doesn't Work
- Check Environment Variables in Vercel Settings
- Verify spelling of `AUTH_USERNAME` and `AUTH_PASSWORD`
- Redeploy after adding env vars

### Balances Not Showing
- Check browser Network tab for API responses
- Verify token is in localStorage
- Check Vercel function logs

### Pages Are Blank
- Open browser DevTools → Console
- Check for JavaScript errors
- Verify build completed successfully in Vercel

## Post-Deployment

- [ ] Share the Vercel URL with your team
- [ ] Test on mobile device
- [ ] Create documentation for users
- [ ] Set up monitoring/alerts (optional)
- [ ] Plan database upgrade (optional)

## Success!

Your app is now live at your Vercel URL. You can:

- **Access it**: Visit your Vercel project URL
- **Make changes**: Push to main branch, Vercel auto-deploys
- **Update credentials**: Change in Vercel Environment Variables
- **Monitor**: Use Vercel analytics and logs
- **Scale**: Upgrade database when ready

## Next Steps

### Improve the App
1. Add more features
2. Integrate real database
3. Add user management
4. Add analytics
5. Custom domain (optional)

### Upgrade Database
- **Supabase** (recommended): PostgreSQL + Auth
- **MongoDB**: NoSQL option
- **AWS RDS**: Enterprise option

### Monitor Performance
- Use Vercel Analytics
- Set up error tracking (Sentry)
- Monitor API response times

---

## Quick Reference

**Your Vercel URL**: (appears after deployment)

**Environment Variables Set:**
- AUTH_USERNAME = MabelHeath
- AUTH_PASSWORD = Heathmabel209@

**Support Resources:**
- [QUICK_START.md](./QUICK_START.md) - Detailed setup guide
- [README.md](./README.md) - Project overview
- [Vercel Docs](https://vercel.com/docs) - Official documentation

**Time to Deploy**: ~5 minutes
