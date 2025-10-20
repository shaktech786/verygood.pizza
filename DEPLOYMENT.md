# 🚀 Very Good Pizza - Deployment Guide

## Quick Deploy to Vercel

### Option 1: Via Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (first time)
vercel

# Deploy to production
vercel --prod
```

### Option 2: Via GitHub Integration

1. Push code to GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Configure settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
6. Click "Deploy"

## Domain Configuration

### DNS Records for verygood.pizza

Add these records in your DNS provider:

```
Type    Name    Value                       TTL
A       @       76.76.21.21                 3600
CNAME   www     cname.vercel-dns.com        3600
```

### In Vercel Dashboard

1. Go to Project Settings → Domains
2. Add `verygood.pizza`
3. Add `www.verygood.pizza`
4. Wait for DNS propagation (5-30 minutes)

## Environment Variables

Currently none required. When adding API integrations, create these in Vercel dashboard:

### For Twitch Integration
```
NEXT_PUBLIC_TWITCH_CLIENT_ID=your_client_id
TWITCH_CLIENT_SECRET=your_secret
```

### For YouTube Integration
```
NEXT_PUBLIC_YOUTUBE_API_KEY=your_api_key
```

### For Discord Integration
```
NEXT_PUBLIC_DISCORD_SERVER_ID=your_server_id
DISCORD_BOT_TOKEN=your_bot_token
```

## Pre-Deployment Checklist

- [x] Build succeeds locally (`npm run build`)
- [x] No TypeScript errors
- [x] No ESLint warnings
- [x] Mobile responsive tested
- [ ] Add logo files to `/public`
- [ ] Create `og-image.png` (1200x630)
- [ ] Create favicon files
- [ ] Test all social links
- [ ] Verify Twitch CTA works
- [ ] Add Google Analytics (optional)

## Post-Deployment Tasks

### Immediate (Day 1)
1. Test all links on live site
2. Verify mobile responsive on real devices
3. Test page load speed (target <2s)
4. Share on all social media channels
5. Update Twitch "About" with new URL

### Week 1
1. Monitor Vercel Analytics
2. Check for 404 errors
3. Set up Google Analytics (if needed)
4. Collect user feedback
5. A/B test CTA button placement

### Month 1
1. Add stream schedule feature
2. Implement Discord integration
3. Create content showcase section
4. Add email capture (if desired)
5. Optimize based on analytics

## Monitoring & Analytics

### Vercel Analytics (Built-in)
- Page views
- Unique visitors
- Top pages
- Performance metrics

### Google Analytics 4 (Optional)

Add to `app/layout.tsx`:
```tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

## Performance Targets

- **Lighthouse Score:** 95+
- **First Contentful Paint:** <1.5s
- **Time to Interactive:** <3s
- **Largest Contentful Paint:** <2.5s
- **Cumulative Layout Shift:** <0.1

## Troubleshooting

### Build Fails on Vercel
1. Check build logs in Vercel dashboard
2. Verify Node.js version (18+)
3. Test build locally: `npm run build`
4. Check for missing dependencies

### Domain Not Working
1. Verify DNS records are correct
2. Wait 24h for full DNS propagation
3. Check Vercel domain status
4. Clear browser cache

### Images Not Loading
1. Verify images are in `/public` directory
2. Check file paths are correct
3. Ensure images are optimized (<500KB)
4. Use Next.js Image component

## Rollback Plan

If deployment has issues:

```bash
# Via Vercel CLI
vercel rollback

# Via Dashboard
1. Go to Deployments tab
2. Find previous working deployment
3. Click three dots → "Promote to Production"
```

## Support Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)

---

**Deployment completed by:** Claude Code
**Date:** 2025-10-20
**Status:** ✅ Ready for Production
