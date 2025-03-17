# Todo-Task Server

## Overview
The **Todo-Task Server** is the backend of the Todo-Task project, a real-time drag-and-drop task management system. It is built using **Node.js**, **Express.js**, and **WebSocket** to provide efficient task handling and real-time updates.

## Features
- WebSocket support for real-time task updates.
- REST API for task management (CRUD operations).
- Secure and optimized server-side logic.
- MongoDB integration for persistent data storage.
- CORS enabled for frontend communication.

## Technologies Used
- **Backend:** Node.js, Express.js
- **Real-time Communication:** WebSocket
- **Database:** MongoDB
- **Authentication:** JWT (if applicable)
- **Hosting:** Render / Railway / Vercel (Backend)

## API Endpoints
### Tasks
- `GET /tasks` - Retrieve all tasks
- `POST /tasks` - Add a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## Installation & Setup
Follow these steps to set up the server locally:

### 1. Clone the Repository
```bash
git clone https://github.com/jahidul2004/todo-task-server.git
cd todo-task-server
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add:
```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```

### 4. Run the Server
```bash
npm start
```

The server will run on `http://localhost:5000`.

## Live Server
🔗 [Live API](https://to-do-server-tan.vercel.app/)

## Contributing
Feel free to submit a pull request if you'd like to contribute.


---
📩 For any queries, contact: [islamjahiduljihad@gmail.com](mailto:your-email@example.com)
