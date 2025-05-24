# Deployment Guide for Steam Friends Game Comparison

## Prerequisites

Before deploying, you'll need:
1. Node.js installed (version 14 or higher)
2. Git installed
3. A GitHub account
4. A Steam Web API key

## Local Setup

1. **Install Node.js** (if not already installed):
   - Visit https://nodejs.org/
   - Download and install the LTS version
   - Verify installation: `node --version` and `npm --version`

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Test locally**:
   ```bash
   npm start
   ```
   - Open http://localhost:3000 in your browser
   - Test with Steam usernames to ensure it works

## GitHub Setup

1. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Name it something like "steam-friends-game-comparison"
   - Make it public
   - Don't initialize with README (we already have files)

2. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Steam friends game comparison app"
   git branch -M main
   git remote add origin https://github.com/yourusername/steam-friends-game-comparison.git
   git push -u origin main
   ```

## Deployment Options

### Option 1: Heroku (Recommended)

1. **Install Heroku CLI**:
   - Visit https://devcenter.heroku.com/articles/heroku-cli
   - Download and install for your OS

2. **Deploy to Heroku**:
   ```bash
   heroku login
   heroku create your-app-name
   heroku config:set STEAM_API_KEY=your_steam_api_key_here
   git push heroku main
   ```

3. **Open your app**:
   ```bash
   heroku open
   ```

### Option 2: Railway

1. **Sign up at Railway**:
   - Go to https://railway.app/
   - Sign up with GitHub

2. **Deploy**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Add environment variable: `STEAM_API_KEY` = your Steam API key
   - Railway will automatically deploy

### Option 3: Render

1. **Sign up at Render**:
   - Go to https://render.com/
   - Sign up with GitHub

2. **Deploy**:
   - Click "New Web Service"
   - Connect your GitHub repository
   - Set environment variable: `STEAM_API_KEY` = your Steam API key
   - Deploy

### Option 4: Vercel (with Serverless Functions)

For Vercel, you'll need to modify the structure slightly to use serverless functions:

1. **Create `api` directory structure**:
   ```
   api/
   ├── resolve/
   │   └── [username].js
   ├── games/
   │   └── [steamid].js
   └── gamedetails/
       └── [appid].js
   ```

2. **Convert server.js endpoints to Vercel functions** (this requires code restructuring)

## Environment Variables

For production deployment, set these environment variables:

- `STEAM_API_KEY`: Your Steam Web API key
- `PORT`: (Optional) Port number (most platforms set this automatically)

## Security Notes

1. **Never commit your API key to GitHub**
   - The `.gitignore` file already excludes the `apikey` file
   - Always use environment variables in production

2. **Keep your Steam API key secure**
   - Don't share it publicly
   - Regenerate it if compromised

## Troubleshooting

### Common Issues:

1. **"Steam API key not found" error**:
   - Make sure `STEAM_API_KEY` environment variable is set
   - For local development, ensure `apikey` file exists

2. **CORS errors**:
   - This shouldn't happen with the backend approach
   - If it does, check that requests are going to your backend, not directly to Steam

3. **"Profile is private" errors**:
   - Steam profiles must be public to access game data
   - Ask users to make their profiles public temporarily

4. **Rate limiting**:
   - Steam API has rate limits
   - The app includes basic error handling for this

## Monitoring

After deployment, monitor your app for:
- API rate limits
- Error rates
- User feedback

## Updates

To update your deployed app:
1. Make changes locally
2. Test thoroughly
3. Commit and push to GitHub
4. Most platforms will auto-deploy from GitHub

## Cost Considerations

- **Heroku**: Free tier available (sleeps after 30 min of inactivity)
- **Railway**: $5/month for hobby plan
- **Render**: Free tier available
- **Vercel**: Free tier available for personal projects

Choose based on your needs and budget.
