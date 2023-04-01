const express = require('express');
const axios = require('axios');
const base64 = require('base-64');
const serveIndex = require('serve-index')
const app = express();
app.set('view engine', 'ejs')

const config = require('./config.json');

const CLIENT_ID = config.client_id;
const CLIENT_SECRET = config.client_secret;
const TOKEN_URL = config.redirect_url;
const REFRESH_TOKEN = config.refresh_token;


app.get('/', async (req, res) => {
    try {
      const response = await axios.get('http://localhost/spotify');
      const { track, album, cover, artists, activeDevice } = response.data;
      res.render('index', { track, album, cover, artists, activeDevice });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving data from Spotify API');
    }
});

app.get('/spotify', async (req, res) => {
  try {
    const token = await getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', { headers });
    const track = response.data.item.name;
    const album = response.data.item.album.name;
    const cover = response.data.item.album.images[0].url;
    const artists = response.data.item.artists.map(artist => artist.name).join(', ');
    const responseDevices = await axios.get('https://api.spotify.com/v1/me/player/devices', { headers });
    const activeDevice = responseDevices.data.devices.find(device => device.is_active).name;
    res.json({ track, album, cover, artists, activeDevice });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data from Spotify API');
  }
});

async function getAccessToken() {
  const data = `grant_type=refresh_token&refresh_token=${REFRESH_TOKEN}`;
  const headers = {
    Authorization: `Basic ${base64.encode(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  const response = await axios.post(TOKEN_URL, data, { headers });
  return response.data.access_token;
}

app.use(express.static("./views/"))
app.use('/assets/', serveIndex('./assets/'))

app.listen(config.port, () => console.log(`Server running on port ${config.port}`));