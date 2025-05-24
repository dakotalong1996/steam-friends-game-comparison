const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Get Steam API key from environment variable or local file
let STEAM_API_KEY;
if (process.env.STEAM_API_KEY) {
    STEAM_API_KEY = process.env.STEAM_API_KEY;
} else {
    try {
        STEAM_API_KEY = fs.readFileSync('apikey', 'utf8').trim();
    } catch (error) {
        console.error('Steam API key not found. Please set STEAM_API_KEY environment variable or create an "apikey" file.');
        process.exit(1);
    }
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Resolve Steam ID from username
app.get('/api/resolve/:username', async (req, res) => {
    const { username } = req.params;
    
    // If it's already a 64-bit Steam ID, return it
    if (/^\d{17}$/.test(username)) {
        return res.json({ success: true, steamid: username });
    }
    
    try {
        const url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${STEAM_API_KEY}&vanityurl=${username}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.response.success === 1) {
            res.json({ success: true, steamid: data.response.steamid });
        } else {
            res.json({ success: false, error: `Could not resolve Steam ID for: ${username}` });
        }
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

// Get user's games
app.get('/api/games/:steamid', async (req, res) => {
    const { steamid } = req.params;
    
    try {
        const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${steamid}&format=json&include_appinfo=true&include_played_free_games=true`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.response && data.response.games) {
            res.json({ success: true, games: data.response.games });
        } else {
            res.json({ success: false, error: `Could not fetch games for Steam ID: ${steamid}. Profile might be private.` });
        }
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

// Get game details (achievements, etc.)
app.get('/api/gamedetails/:appid', async (req, res) => {
    const { appid } = req.params;
    
    try {
        const url = `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${STEAM_API_KEY}&appid=${appid}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.game) {
            res.json({ 
                success: true, 
                achievements: data.game.availableGameStats?.achievements?.length || 0,
                stats: data.game.availableGameStats?.stats?.length || 0
            });
        } else {
            res.json({ success: false, error: 'Game details not found' });
        }
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Steam Game Comparison server running at http://localhost:${PORT}`);
});
