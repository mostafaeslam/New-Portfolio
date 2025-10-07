# 🚀 Deployment Guide

## Quick Deployment Options

### Option 1: Vercel (Recommended for Custom Domains)

1. **Push to GitHub**
```bash
git add .
git commit -m "Production ready portfolio"
git push origin main
```

2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Sign up with GitHub
- Import repository
- Deploy automatically

3. **Custom Domain Setup**
- Add domain in Vercel dashboard
- Update DNS records:
  - Type: `CNAME`
  - Name: `www`
  - Value: `cname.vercel-dns.com`
  - Type: `A`
  - Name: `@`
  - Value: `76.76.19.61`

### Option 2: Netlify

1. **Deploy to Netlify**
- Go to [netlify.com](https://netlify.com)
- Connect GitHub repository
- Build settings:
  - Build command: (empty)
  - Publish directory: `/`

2. **Custom Domain**
- Add domain in Netlify dashboard
- Update DNS to point to Netlify

### Option 3: GitHub Pages

1. **Enable GitHub Pages**
- Go to repository Settings
- Scroll to Pages section
- Select source: Deploy from a branch
- Choose `main` branch and `/` folder

2. **Custom Domain**
- Add custom domain in Pages settings
- Create `CNAME` file with your domain

## Backend Deployment

### Railway (Recommended)

1. **Deploy to Railway**
- Go to [railway.app](https://railway.app)
- Connect GitHub repository
- Deploy `backend` folder
- Add environment variables:
  ```
  EMAIL_USER=your-email@gmail.com
  EMAIL_PASS=your-app-password
  EMAIL_SERVICE=gmail
  PORT=3001
  ```

2. **Update Frontend**
- Update API URL in `script.js`
- Replace `localhost:3001` with Railway URL

### Vercel Functions

1. **Create API folder**
- Create `api/contact.js` in root
- Move backend logic to serverless function

2. **Deploy**
- Push to GitHub
- Vercel will automatically deploy functions

## Environment Variables

### Frontend (.env.local)
```
VITE_API_URL=https://your-api-url.com
```

### Backend (.env)
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_SERVICE=gmail
PORT=3001
NODE_ENV=production
```

## SSL/HTTPS

All recommended platforms provide automatic SSL certificates:
- ✅ Vercel - Automatic HTTPS
- ✅ Netlify - Automatic HTTPS  
- ✅ Railway - Automatic HTTPS
- ✅ GitHub Pages - Automatic HTTPS

## Performance Optimization

1. **Image Optimization**
- Use WebP format
- Compress images
- Add lazy loading

2. **Code Optimization**
- Minify CSS/JS
- Enable Gzip compression
- Use CDN

3. **SEO**
- Add meta tags
- Create sitemap.xml
- Submit to Google Search Console

## Monitoring

1. **Analytics**
- Google Analytics
- Vercel Analytics
- Netlify Analytics

2. **Uptime Monitoring**
- UptimeRobot
- Pingdom
- StatusCake

## Backup Strategy

1. **Code Backup**
- GitHub repository (primary)
- Local backup
- Multiple cloud storage

2. **Data Backup**
- Database backups (if applicable)
- Environment variables backup
- SSL certificates backup

## Troubleshooting

### Common Issues

1. **CORS Errors**
- Check API URL configuration
- Verify CORS settings in backend

2. **Contact Form Not Working**
- Check environment variables
- Verify email service credentials
- Check API endpoint

3. **Images Not Loading**
- Check file paths
- Verify image formats
- Check file permissions

### Support

- Check platform documentation
- GitHub Issues
- Stack Overflow
- Platform support forums
