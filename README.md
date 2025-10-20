# 🍕 Very Good Pizza - Website Rebuild

**Tagline:** *It's Gaming. Not DiGiorno.*

Modern, mobile-first website for the Very Good Pizza gaming & beatboxing community.

## 🚀 Tech Stack

- **Framework:** Next.js 15.5+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel (recommended)

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Design Features

### Color Palette
- **Primary Purple:** `from-purple-900 via-purple-800 to-gray-800`
- **CTA Cyan:** `#00d9ff` (cyan-400)
- **Logo Red:** `#ff5757` (red-500/600)

### Animations
- Smooth page load with staggered element reveals
- Interactive hover effects on all buttons
- Responsive transitions using Framer Motion

### Mobile-First
- Optimized for 60%+ mobile traffic
- Touch-friendly navigation
- Responsive typography and spacing

## 🔗 Social Media Links

All social links are configured in `app/page.tsx`:
- **Twitch:** https://twitch.tv/verygoodpizza
- **YouTube:** https://youtube.com/@verygoodpizzaofficial
- **TikTok:** https://tiktok.com/@verygood.pizza
- **Instagram:** https://instagram.com/verygoodpizzaofficial
- **Facebook:** https://facebook.com/verygoodpizza
- **Threads:** https://threads.net/@verygoodpizzaofficial
- **Bluesky:** https://bsky.app/profile/verygood.pizza

## 🛠️ Customization

### Update Content
Edit `app/page.tsx` to modify:
- Hero text and tagline
- CTA button links
- Social media URLs
- Color schemes

### Add Logo/Assets
Place images in `/public` directory:
- `logo.png` - Main logo
- `og-image.png` - Social sharing image (1200x630)
- `favicon.ico` - Browser icon

### SEO Metadata
Update `app/layout.tsx` for:
- Page titles
- Meta descriptions
- Open Graph tags
- Twitter Card data

## 🔌 Future Enhancements

### Phase 2 Features (Ready to Add)
1. **Live Status Integration**
   - Twitch API for real-time "LIVE" indicator
   - Automatic stream countdown timer

2. **Discord Integration**
   - Member count widget
   - Invite link with preview

3. **Stream Schedule**
   - Weekly calendar
   - Timezone auto-detection
   - Add-to-calendar buttons

4. **Content Showcase**
   - Twitch clips embed
   - YouTube videos grid
   - Filter by category (gaming/beatboxing)

### API Setup (When Ready)

Create `.env.local`:
```bash
# Twitch
NEXT_PUBLIC_TWITCH_CLIENT_ID=your_client_id
TWITCH_CLIENT_SECRET=your_secret

# YouTube
NEXT_PUBLIC_YOUTUBE_API_KEY=your_api_key

# Discord
NEXT_PUBLIC_DISCORD_SERVER_ID=your_server_id
DISCORD_BOT_TOKEN=your_bot_token
```

## 📊 Performance

- **Build Time:** ~15s
- **Page Load:** <2s target
- **Lighthouse Score:** 95+ target
- **Mobile Responsive:** 100%

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Connect Repository:**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Configure Domain:**
   - Add `verygood.pizza` in Vercel dashboard
   - Update DNS records:
     ```
     A     @       76.76.21.21
     CNAME www     cname.vercel-dns.com
     ```

3. **Environment Variables:**
   - Add API keys in Vercel dashboard
   - Auto-deploy on git push

### Manual Deployment

```bash
# Build production bundle
npm run build

# Test production build locally
npm start

# Deploy build folder to any static host
```

## 📝 Maintenance

### Regular Updates
- Update social links when changed
- Add new stream schedules weekly
- Refresh content showcase monthly
- Monitor analytics for optimization

### Content Templates
Create `/content` directory for:
- Stream announcements (MDX)
- Blog posts
- Community highlights

## 🎯 Conversion Goals

1. **Primary:** Twitch follows + live viewers
2. **Secondary:** Discord community growth
3. **Tertiary:** YouTube subscribers
4. **Long-term:** Email list building

## 📈 Analytics (To Add)

Recommended tools:
- **Google Analytics 4** - Traffic analysis
- **Vercel Analytics** - Performance monitoring
- **Hotjar** - User behavior heatmaps

## 🐛 Troubleshooting

### Dev Server Issues
```bash
# Clear cache
rm -rf .next
npm run dev
```

### Build Errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deployment Issues
- Check environment variables are set
- Verify Node.js version (18+)
- Review build logs in Vercel dashboard

---

**Built with 💜 for the Very Good Pizza community**

*Serving nostalgia, beats, and gaming feats*
