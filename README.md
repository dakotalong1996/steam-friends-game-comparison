# Steam Friends Game Comparison

A web application that allows you to compare Steam games between friends using the Steam Web API. Enter Steam usernames or IDs to find common games and filter by various criteria.

## Features

- Compare games between 2+ Steam friends
- **Game thumbnails** - Visual game icons for easy identification
- **Multiple sorting options** - Sort by total playtime, individual playtime, game name, or achievement completion percentage
- **Achievement tracking** - View achievement completion percentages for both friends with visual progress bars
- Filter by multiplayer games, achievements, playtime, and search
- View individual and total playtime for each game
- Direct links to Steam store pages
- Responsive design with Steam-inspired styling
- Real-time filtering and sorting without page reloads

## Setup

### Prerequisites

- Node.js (version 14 or higher)
- Steam Web API Key

### Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/steam-friends-game-comparison.git
cd steam-friends-game-comparison
```

2. Install dependencies:
```bash
npm install
```

3. Get a Steam Web API Key:
   - Go to https://steamcommunity.com/dev/apikey
   - Register for a Steam Web API Key
   - Create a file named `apikey` in the project root and paste your API key

4. Start the server:
```bash
npm start
```

5. Open your browser and go to `http://localhost:3000`

## Deployment

### Heroku

1. Create a Heroku app:
```bash
heroku create your-app-name
```

2. Set your Steam API key as an environment variable:
```bash
heroku config:set STEAM_API_KEY=your_api_key_here
```

3. Deploy:
```bash
git push heroku main
```

### Railway

1. Connect your GitHub repository to Railway
2. Set the `STEAM_API_KEY` environment variable in Railway dashboard
3. Deploy automatically from GitHub

### Vercel/Netlify

Note: These platforms are primarily for static sites. For the Node.js backend, consider using:
- Vercel Functions
- Netlify Functions
- Or deploy the backend separately on Heroku/Railway

## Environment Variables

- `STEAM_API_KEY`: Your Steam Web API key (required)
- `PORT`: Port number (default: 3000)

## Usage

1. Enter Steam usernames or 64-bit Steam IDs for the friends you want to compare
2. Click "Compare Games" to fetch and analyze their game libraries
3. Use the filters to narrow down results:
   - Search by game name
   - Filter for multiplayer games only
   - Filter for games with achievements
   - Set minimum total playtime threshold

## API Endpoints

- `GET /api/resolve/:username` - Resolve Steam username to Steam ID
- `GET /api/games/:steamid` - Get owned games for a Steam user
- `GET /api/gamedetails/:appid` - Get game details (achievements, stats)

## Privacy Note

This application only works with public Steam profiles. If a user's profile is private, their games cannot be fetched.

## License

MIT License - see LICENSE file for details
