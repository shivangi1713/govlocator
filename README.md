# GovLocator

## Setup to run locally

1. Clone or extract this folder.

2. Get a Google Maps API key with **Maps JavaScript API** and **Places API** enabled.

3. Replace `YOUR_API_KEY` in `index.html` with your API key.

4. Run locally: You can either
   - open `index.html` via browser directly, or
   - use a local server (recommended), e.g., `npx http-server` or via VSCode Live Server.

5. Enter a location, pick a service type, hit Search. Markers appear for nearby government services.

## Notes

- You may need to enable billing on your Google Cloud account (for free tier you get certain quota).
- You can adjust search radius, map center etc.
- Later you can host this on Netlify, GitHub Pages etc.
