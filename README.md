# Vue 3 + Vite + Socket.io

This repository contains an example of a collaborative workspace dashboard application. Your task is to build a real-time frontend application that allows team members to manage tasks, share updates, and communicate in a shared digital environment made in vue + socket.io.

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the mock server:
   ```
   npm run server
   ```
4. In another terminal, start the frontend development server:
   ```
   npm run dev
   ```
5. Open your browser to the URL shown in the terminal (typically http://localhost:5173)
6. Use the username `marco.patierno` or `bob.marley` with any password to access the Dashboard
7. Enjoy your real-time Kanban board and the team chat

## Notes
For this project I used Vanilla Javascript with JSDoc and for the store I opted for decentralized store approach without any library but somehow using a mixed concept between Pina and the classic React hook approach.
Each store/hook is responsible for a specific domain and always expose the state and the mutation function.
I also used the provide/inject approach to expose a component's ref and the mutation function to child components.

## Available Socket Events

The mock server implements these events:

- **user:join** - Send when a user joins with their name and avatar
- **user:status** - Send when a user changes their status
- **task:create** - Send when a user creates a new task
- **task:update** - Send when a user updates a task
- **task:move** - Send when a user moves a task between columns
- **message:send** - Send when a user sends a chat message
- **user:typing** - Send when a user starts/stops typing
- **workspace:update** - Received with the current workspace state after any change

## Socket Event Reference

The mock server handles all socket interactions, so you only need to implement the client-side events:

```javascript
// Connect to the server
socketService.connect();

// Join the workspace (after login)
socketService.joinWorkspace({ name: 'User Name', avatar: '1' });

// Change user status
socketService.updateStatus('away'); // 'active', 'away', or 'do-not-disturb'

// Create a new task
socketService.createTask({
  title: 'Task Title',
  description: 'Task Description',
  status: 'todo' // 'todo', 'in-progress', or 'done'
});

// Update an existing task
socketService.updateTask({
  id: 'task-1',
  title: 'Updated Title',
  description: 'Updated Description'
});

// Move a task to a different status
socketService.moveTask('task-1', 'in-progress');

// Send a chat message
socketService.sendMessage('Hello team!');

// Send typing indicator
socketService.setTyping(true); // or false when stopped typing
```
