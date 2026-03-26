# Lists App

A full-stack web application built with Vue.js frontend and Express.js backend, designed to manage various lists including clothes, tattoos, and measurements.

## Tech Stack

- **Frontend**: Vue 3, Vite, Tailwind CSS, DaisyUI, Vue Router
- **Backend**: Express.js, PostgreSQL, CORS
- **Build Tool**: Custom batch script for building and deployment

## Project Structure

```
├── frontend/          # Vue.js frontend application
├── backend/               # Express.js backend server
├── Clothes icons/         # Assets and data files
└── build.bat             # Build script for the project
```

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [PostgreSQL](https://www.postgresql.org/) (for database)

## Installation

### 1. Install Dependencies

Install dependencies for the root, frontend, and backend:

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Set Up Database

Configure your PostgreSQL database connection in `backend/db.js`. Update the connection details to match your PostgreSQL setup.

## Running the Project

### Development Mode

To run the project in development mode with hot reloading:

```bash
# Terminal 1: Start the backend server
cd backend
npm start
# Server runs on http://localhost:3000

# Terminal 2: Start the frontend development server
cd frontend
npm run dev
# Development server runs on http://localhost:5173
```

### Production Build

To build the project for production:

```bash
# Run the build script
build.bat
```

This script will:

1. Build the Vue.js frontend
2. Clear the old `backend/dist` folder
3. Copy the new build to `backend/dist`
4. The backend serves the static files

After building, start the backend to serve the application:

```bash
cd backend
npm start
# Application runs on http://localhost:3000
```

## Available Scripts

### Frontend (`frontend/`)

- `npm run dev` - Start development server with hot module reloading
- `npm run build` - Build for production
- `npm run preview` - Preview the production build

### Backend (`backend/`)

- `npm start` - Start the Express server on port 3000

## Features

- Manage multiple lists (Clothes, Tattoos, Measurements)
- Responsive UI with Tailwind CSS and DaisyUI components
- RESTful API backend with PostgreSQL database
- CSV data import support for clothes items

## API Endpoints

The backend provides API endpoints for managing list items. See `backend/server.js` for detailed endpoint documentation.

## File Structure Details

- **Frontend**: `frontend/src/` contains Vue components and views
  - `components/` - Reusable Vue components
  - `views/` - Page components for different lists
  - `router.js` - Vue Router configuration
  - `App.vue` - Main application component

- **Backend**: `backend/` contains server logic
  - `server.js` - Express server setup and routes
  - `db.js` - PostgreSQL database configuration

## Troubleshooting

- **Port already in use**: If port 3000 or 5173 is already in use, check what's running on those ports or modify the port configuration.
- **Database connection error**: Verify PostgreSQL is running and the connection details in `backend/db.js` are correct.
- **Build errors**: Clear `node_modules` and reinstall dependencies if you encounter issues.

## License

ISC
