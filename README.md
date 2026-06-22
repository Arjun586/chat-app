# Chat App

A full-stack real-time chat application built with a modern JavaScript stack. The project is organized into two separate workspaces — a **client** (frontend) and a **server** (backend) — enabling clean separation of concerns and independent scalability.

---

## Project Structure

```
chat-app/
├── client/          # Frontend application (React / Vite)
├── server/          # Backend application (Node.js / Express)
├── .gitIgnore
└── README.md
```

---

## Features

- Real-time messaging via WebSockets (Socket.io)
- User authentication (JWT-based)
- Support for multiple users / chat rooms
- Modular client-server architecture
- RESTful API backend
- Fast development experience with Vite (frontend)

---

## Tech Stack

### Frontend (`/client`)
| Technology | Purpose |
|---|---|
| React | UI library |
| Vite | Build tool & dev server |
| JavaScript | Primary language |
| CSS | Styling |

### Backend (`/server`)
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| Socket.io | Real-time WebSocket communication |
| JavaScript | Primary language |

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/Arjun586/chat-app.git
cd chat-app
```

### 2. Set Up the Server

```bash
cd server
npm install
```

Create a `.env` file in the `/server` directory and add your environment variables:

```env
PORT=5000
# Add any other required variables (e.g., DB connection string, JWT secret)
JWT_SECRET=your_jwt_secret_here
MONGO_URI=your_mongodb_connection_string
```

Start the server:

```bash
npm start
# or for development with hot-reload:
npm run dev
```

The server will start on `http://localhost:5000` (or your configured port).

### 3. Set Up the Client

Open a new terminal window:

```bash
cd client
npm install
```

Create a `.env` file in the `/client` directory if needed:

```env
VITE_API_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

The client will start on `http://localhost:5173` (Vite default).

---

## 🔧 Available Scripts

### Server

| Command | Description |
|---|---|
| `npm start` | Start the production server |
| `npm run dev` | Start with auto-reload (nodemon) |
| `npm test` | Run tests |

### Client

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## Environment Variables

> Never commit `.env` files to version control. They are listed in `.gitIgnore` by default.

| Variable | Location | Description |
|---|---|---|
| `PORT` | `/server/.env` | Port the server listens on |
| `JWT_SECRET` | `/server/.env` | Secret key for signing JWT tokens |
| `MONGO_URI` | `/server/.env` | MongoDB connection string |
| `VITE_API_URL` | `/client/.env` | Backend API base URL |



---
