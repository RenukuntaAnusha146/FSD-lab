# PlantCare Tracker (MERN)

Full Stack Web Development (22CAC11N) - Renukunta Anusha, 160124748088

## Folders
- `server/`  Node.js + Express + Mongoose API (port 5000)
- `client/`  React + Vite app (port 5173)
- `demo/plantcare-tracker.html`  standalone full-featured UI (open in a browser, no setup)

## Run (needs Node.js and MongoDB running locally)
1. Start MongoDB (`mongod`, or the MongoDB service).
2. Terminal 1:  `cd server` -> `npm install` -> `npm start`
   Expect: "Server running on port 5000" and "MongoDB Connected".
3. Terminal 2:  `cd client` -> `npm install` -> `npm run dev`
4. Open http://localhost:5173

## API
GET /api/plants | POST /api/plants | DELETE /api/plants/:id

## Problem photos
The "Problem solutions" tab shows a picture for each problem.
To use real photos, save them in `client/public/problems/` named exactly like the drawing
(for example `yellow-leaves.jpg`, `root-rot.jpg`). A `.jpg` or `.png` photo is shown first;
if none exists, the built-in `.svg` drawing is used. Names: yellow-leaves, brown-leaf-tips, wilting,
root-rot, underwatering, overwatering, waterlogged-soil, dry-compacted-soil.

## Push to GitHub
git init -> git add . -> git commit -m "Plant care tracker" -> create an empty repo on github.com ->
git remote add origin <repo-url> -> git branch -M main -> git push -u origin main

## Real photos (both versions)
- React app: put photos in `client/public/problems/`
- Demo page: put photos in `demo/photos/` (open `demo/plantcare-tracker.html` after extracting the zip)
Names: yellow-leaves, brown-leaf-tips, wilting, root-rot, underwatering, overwatering, waterlogged-soil, dry-compacted-soil (.jpg or .png)

## Auto-download real photos
From the project root run: `node get-photos.js` (internet needed). It saves real photos into
`client/public/problems/` and `demo/photos/`. Check them; replace any wrong one with your own image of the same name.
