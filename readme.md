![Banner](spotnow.png)

# SpotNow
Show your currently playing Spotify song in a style!

### Features
- Clean custom [homepage](ui.png)
- Easy setup

### Setup
- Run `npm i` to install the required packages
- Fill in your config in the `sample_config.json` and rename the file to `config.json`
- Run `node .` to start your server!

### Getting your refresh token
There is a helpful [website](https://spotify-refresh-token-generator.netlify.app/#welcome), that helps you get your refresh token easier than ever! If you finished getting your refresh token, just simply put it into your config.

### Sample config.json

```json
{
    "port": 80,
    "client_id": "",
    "client_secret": "",
    "redirect_url": "https://accounts.spotify.com/api/token",
    "refresh_token": ""
}
```

If you have any issues, feel free to contact me through Discord, or make an issue here!
