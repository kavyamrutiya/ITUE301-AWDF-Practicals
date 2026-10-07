# Practical 10: Asynchronous Processing with Event-Driven Architecture

## 1. Practical Title
**Practical 10: Asynchronous Processing with Event-Driven Architecture**  
**Subject:** Advanced Web Development Frameworks (ITUE301)  
**Semester:** 5th Semester, Computer Engineering  
**Institution:** Charotar University of Science and Technology (CHARUSAT), FTE  

---

## 2. Objective
To implement asynchronous, non-blocking background task processing using Node.js native `EventEmitter` without external queuing dependencies, decoupling notifications and side effects from the primary HTTP request-response cycle and verifying timestamp ordering.

---

## 3. Technologies Used
- **Event Engine:** Node.js Native `events.EventEmitter` (No external queue/broker)
- **Backend Framework:** Express.js 4+
- **Database:** MongoDB & Mongoose
- **Inherited Stack:** JWT Authentication (P7) + `node-cache` (P9)

---

## 4. Folder Structure
```
Practical_10_EventEmitter/
├── backend/
│   ├── package.json
│   ├── server.js                # Imports ./events/taskListeners at startup
│   ├── events/
│   │   ├── taskEvents.js        # Dedicated EventEmitter instance
│   │   └── taskListeners.js     # Asynchronous listeners with artificial delay
│   ├── controllers/
│   │   └── taskController.js    # Emits 'task-created' and 'task-deleted' after response
│   ├── scripts/
│   │   └── test-events.js       # Automated timestamp sequence verifier
│   ├── config/ (db.js, cache.js)
│   ├── models/ (Task.js, User.js)
│   ├── routes/ (authRoutes.js, taskRoutes.js, debugRoutes.js)
│   └── middleware/ (auth.js, logger.js, etc.)
├── verification.md
└── README.md
```

---

## 5. Installation Steps
1. Navigate to backend:
   ```bash
   cd backend
   cp .env.example .env
   npm install
   ```

---

## 6. Run Commands
1. Start the server:
   ```bash
   npm start
   # Listens at http://localhost:5001
   ```
2. Run the event verification test:
   ```bash
   npm run test-events
   ```

---

## 7. Event Architecture & Pipeline

```text
       POST /tasks Request
               │
               ▼
       Commit to MongoDB
               │
               ▼
       Invalidate Cache (all_tasks)
               │
               ▼
       [API] Send HTTP 201 Response ──────► Client receives response (~2ms)
               │
               ▼ (Asynchronous Next Tick via setImmediate)
       taskEvents.emit('task-created', task)
               │
               ▼
       Notification Listener:
       ├── Log [Notification] STARTED at T+2ms
       ├── Simulate background work (setTimeout 800ms)
       └── Log [Notification] COMPLETED at T+802ms
```

---

## 8. Timestamp Evidence in Console Output
When creating a task, observe the strict timestamp ordering:
```
[API] Response SENT at 2026-10-07T09:30:10.150Z (Status 201)
[Notification] Handler STARTED at 2026-10-07T09:30:10.152Z for Task: "Practical 10 Async Task"
[Notification] Handler COMPLETED at 2026-10-07T09:30:10.952Z (Email dispatch simulated in 800ms background thread)
```
**Conclusion:** The API response is sent to the client **802 ms before** the background notification handler finishes executing.

---

## 9. What Was Implemented
1. **Inherited Practical 9 Stack:** Preserved MongoDB models, JWT authentication, `node-cache` cache checking and cache invalidation.
2. **Dedicated Events Module (`events/taskEvents.js`):** Subclassed `EventEmitter` into a shared singleton.
3. **Dedicated Listeners Module (`events/taskListeners.js`):**
   - Registered listeners for `task-created`, `task-deleted`, and `error`.
   - Simulated realistic asynchronous background tasks (such as sending user emails or writing audit logs) with an 800ms artificial delay.
4. **Non-Blocking Controller Flow (`controllers/taskController.js`):**
   - Dispatched `res.status(201).json(...)` immediately.
   - Used `setImmediate()` to emit events on the next turn of the event loop.
5. **Supplementary Events:**
   - Implemented `task-deleted` event emitted on `DELETE /tasks/:id`.
   - Error handler listener catches and prevents unhandled error exceptions.

---

## 10. Testing Instructions
1. Run `npm start`. Confirm console prints `[EVENTS] Dedicated Task Event Listeners registered successfully`.
2. In a separate terminal, execute:
   ```bash
   node scripts/test-events.js
   ```
3. Look at the server terminal and observe the timestamp logs. Notice that the client receives the response before the handler logs completion.

---

## 11. Viva / Demo Discussion Points
1. **How does EventEmitter enable asynchronous behavior in single-threaded Node.js?** While Node.js runs on a single main thread, emitting an event does not halt the call stack if listener execution is deferred or schedules asynchronous I/O via the event loop. The HTTP response is completed, freed, and transmitted to the client, while timers and callbacks are queued in the Node.js event loop phases.
2. **Why not put notification code directly inside the route handler?** If an external email provider takes 2 seconds to respond, putting that logic inside `POST /tasks` forces the user to wait 2 extra seconds before receiving confirmation. Using an event decouples this side effect, keeping the API response under 10ms.
3. **When is EventEmitter NOT sufficient?** EventEmitter is process-local. If the Node.js server crashes before an event finishes, the event is permanently lost. For enterprise durability and high availability, distributed message queues such as RabbitMQ, BullMQ with Redis, or Apache Kafka are used.
