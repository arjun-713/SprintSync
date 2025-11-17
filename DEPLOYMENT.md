# Deployment Guide for SprintSync

## Deploy to Vercel (Recommended)

### Method 1: Using Vercel Dashboard (Easiest)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration
   - Click "Deploy"

3. **Done!** Your app will be live at `https://your-project.vercel.app`

### Method 2: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod --dir=dist
   ```

3. **Or use Netlify Dashboard**
   - Drag and drop the `dist` folder to [netlify.com/drop](https://app.netlify.com/drop)

## Deploy to GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   Add to scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

3. **Update vite.config.js**
   Add base URL:
   ```javascript
   export default defineConfig({
     base: '/your-repo-name/',
     plugins: [react()],
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

## Environment Variables (Optional)

If you need environment variables:

1. Create `.env` file (already in .gitignore):
   ```
   VITE_API_URL=your_api_url
   VITE_GOOGLE_MEET_API_KEY=your_key
   ```

2. Add to Vercel:
   - Go to Project Settings → Environment Variables
   - Add your variables

3. Access in code:
   ```javascript
   const apiUrl = import.meta.env.VITE_API_URL
   ```

## Build Optimization

The project is already optimized with:
- ✅ Vite for fast builds
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification
- ✅ Asset optimization

## Post-Deployment Checklist

- [ ] Test all navigation links
- [ ] Verify task creation and drag-drop
- [ ] Test meeting scheduler
- [ ] Check responsive design on mobile
- [ ] Verify timezone displays
- [ ] Test Google Meet integration
- [ ] Check all modals and forms

## Troubleshooting

### Build Fails
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (16+ required)
- Clear cache: `rm -rf node_modules dist && npm install`

### Routing Issues
- Ensure `vercel.json` has the rewrite rule for SPA routing
- For other platforms, configure redirects to `/index.html`

### Styling Issues
- Verify Tailwind CSS is properly configured
- Check `tailwind.config.js` and `postcss.config.js`

## Custom Domain (Optional)

### On Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

## Monitoring

After deployment, monitor:
- Page load times
- Error rates (use Vercel Analytics)
- User interactions
- API calls (if any)

## Updates

To deploy updates:
```bash
git add .
git commit -m "Your update message"
git push
```

Vercel will automatically redeploy on push to main branch.

## Support

For issues:
- Check Vercel deployment logs
- Review browser console for errors
- Verify all environment variables are set
