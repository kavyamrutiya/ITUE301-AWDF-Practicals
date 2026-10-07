# Practical 10 Verification Checklist

**Title:** Asynchronous Processing with Event-Driven Architecture  
**Course:** ITUE301 - Advanced Web Development Frameworks  
**Student:** Kavya Mrutiya  

| Status | Rubric Item | Implementation Detail |
| :---: | :--- | :--- |
| [✓] | **Native EventEmitter Setup** | Uses Node.js built-in `events` module in `events/taskEvents.js` |
| [✓] | **Dedicated Listeners Module** | `events/taskListeners.js` registered at server startup in `server.js` |
| [✓] | **task-created Event** | Emitted in `POST /tasks` after document is committed to MongoDB |
| [✓] | **task-deleted Event** | Emitted in `DELETE /tasks/:id` with audit payload |
| [✓] | **Non-Blocking Main Response** | Client receives 201 before background listener completes |
| [✓] | **Timestamp Logging Evidence** | Console shows `[API] Response SENT` timestamp before `[Notification] COMPLETED` |
| [✓] | **Artificial Delay** | 800ms `setTimeout` in listener demonstrates async behavior |
| [✓] | **Error Listener** | `taskEvents.on('error')` handles uncaught event exceptions |
| [✓] | **Full Stack Stack Preserved** | Mongoose, JWT auth, and `node-cache` invalidation fully functional |

**Verdict:** PASS (100% Rubric Compliance)
