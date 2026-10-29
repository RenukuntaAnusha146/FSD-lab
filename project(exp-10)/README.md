# PlantCare Tracker

## Features
- React dashboard to manage plants.
- Add, view, and delete plant details.
- Store plant categories, notes, photos, and health status.
- Track watering schedules and watering history.
- Browser watering reminders while the website is open.
- Plant problem library with symptoms, causes, solutions, and prevention.
- Weather-based plant care tips.

## Technologies Used
- Frontend: React
- Backend: Node.js and Express.js
- Database: MongoDB
- Programming languages: JavaScript, HTML, and CSS

## Requirements
- Node.js LTS
- MongoDB Community Server
- Visual Studio Code

## How to Run

### Start the backend
Open a terminal in VS Code and run:

```powershell
cd backend
copy .env.example .env
npm install
npm run dev
```

### Start the frontend
Open a second terminal and run:

```powershell
cd frontend
npm install
npm run dev
```

Open the frontend URL shown in the terminal, normally `http://localhost:5173`.

## Reminder Limitation
Watering reminders are checked while the website is open. Browser notifications require permission. Notifications are not guaranteed when the browser is fully closed.

## API Endpoints
- `GET /api/plants` — View plants
- `POST /api/plants` — Add a plant
- `POST /api/plants/:id/water` — Record watering
- `PUT /api/plants/:id` — Update a plant
- `DELETE /api/plants/:id` — Delete a plant
- `GET /api/problems` — View plant problems

Plant care suggestions are general guidance and are not a confirmed diagnosis.
