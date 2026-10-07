# Practical 4: Building a RESTful API with Node.js and Express

## 1. Practical Title
**Practical 4: Building a RESTful API with Node.js and Express**  
**Subject:** Advanced Web Development Frameworks (ITUE301)  
**Semester:** 5th Semester, Computer Engineering  
**Institution:** Charotar University of Science and Technology (CHARUSAT), FTE  

---

## 2. Objective
To design and construct a modular RESTful backend server in Node.js and Express implementing full CRUD (Create, Read, Update, Delete) operations using an in-memory storage array, custom logging middleware, Content-Type validation, a 404 catch-all handler, and centralized global error handling.

---

## 3. Technologies Used
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js 4+
- **Protocol:** HTTP (REST Architectural Style)
- **Data Persistence:** In-Memory Array (No database dependency in P4)

---

## 4. Folder Structure
```
Practical_04_Express_CRUD/
├── backend/
│   ├── package.json             # Express dependency and scripts
│   ├── server.js                # App entrypoint and middleware pipeline
│   ├── test-crud.js             # Automated CRUD test suite
│   ├── controllers/
│   │   └── taskController.js    # In-memory CRUD business logic
│   ├── routes/
│   │   └── taskRoutes.js        # Express Router for /tasks
│   └── middleware/
│       ├── logger.js            # Method + URL + ISO Timestamp logger
│       ├── validateContentType.js# 415 enforcement for application/json
│       ├── validateTaskId.js    # Param ID format validation
│       ├── notFound.js          # 404 handler for unmatched routes
│       └── errorHandler.js     # Global error handler (LAST in pipeline)
├── verification.md              # Rubric checklist
└── README.md                    # Practical documentation
```

---

## 5. Installation Steps
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

---

## 6. Run Commands
1. Start the server:
   ```bash
   npm start
   ```
2. Start in auto-reload watch mode:
   ```bash
   npm run dev
   ```
3. Run the automated test suite:
   ```bash
   npm test
   ```

---

## 7. API Endpoints
| HTTP Method | Route | Description | Expected Status |
| :--- | :--- | :--- | :---: |
| `GET` | `/tasks` | Retrieve all tasks (supports query filtering) | `200 OK` |
| `GET` | `/tasks/:id` | Retrieve single task by ID | `200 OK` or `404 Not Found` |
| `POST` | `/tasks` | Create new task (requires JSON body with `title`) | `201 Created` |
| `PUT` | `/tasks/:id` | Update existing task by ID | `200 OK` or `404 Not Found` |
| `DELETE` | `/tasks/:id` | Delete task by ID | `200 OK` or `404 Not Found` |

---

## 8. MongoDB Setup
*Not applicable for Practical 4.* (In-memory storage is required for Practical 4; MongoDB and Mongoose are introduced in Practical 5).

---

## 9. Docker Commands
*Not applicable for Practical 4.* (Docker containerization is Practical 11).

---

## 10. What Was Implemented
1. **Express Server Architecture:** Initialized modular Express application listening on port 5000.
2. **In-Memory Storage:** Maintained thread-safe in-memory array `tasks` pre-populated with initial mock records.
3. **Full CRUD Pipeline:**
   - `GET /tasks`: Returns list of tasks with total count.
   - `GET /tasks/:id`: Searches task by ID; returns 404 if absent.
   - `POST /tasks`: Validates required `title`, assigns auto-incremented ID, sets timestamps, returns `201 Created`.
   - `PUT /tasks/:id`: Updates fields (`title`, `description`, `completed`, `priority`), returns `200 OK`.
   - `DELETE /tasks/:id`: Removes task by ID and returns `200 OK`.
4. **Middleware Pipeline:**
   - `logger.js`: Logs method, URL, and timestamp globally for all incoming requests.
   - `express.json()`: Parses JSON request bodies.
   - `validateContentType.js`: Rejects non-JSON POST/PUT with `415 Unsupported Media Type`.
   - `notFound.js`: Catches undefined routes with structured 404 JSON.
   - `errorHandler.js`: Signature `(err, req, res, next)` defined strictly last to catch all thrown errors.

---

## 11. Testing Instructions
Execute the automated test script included in the repository:
```bash
node test-crud.js
```
Expected output:
```
--- PRACTICAL 4 AUTOMATED TEST SUITE ---
✓ TEST 1: GET /tasks -> Status: 200 | Total tasks: 3
✓ TEST 2: POST /tasks -> Status: 201 | Created ID: 4
✓ TEST 3: GET /tasks/:id -> Status: 200 | Title: Test Task Creation
✓ TEST 4: PUT /tasks/:id -> Status: 200 | Completed: true
✓ TEST 5: DELETE /tasks/:id -> Status: 200 | Deleted ID: 4
✓ TEST 6: GET deleted task -> Status: 404 (Expected 404)
✓ TEST 7: 404 Handler -> Status: 404 (Expected 404)
✓ TEST 8: Content-Type Validation -> Status: 415 (Expected 415)
--- ALL PRACTICAL 4 TESTS PASSED (8/8) ---
```

---

## 12. Viva / Demo Discussion Points
1. **Why must the global error handler have 4 arguments `(err, req, res, next)`?** Express inspects the function's `length` (number of declared arguments). Only functions declaring exactly 4 arguments are registered as error-handling middleware. Omitting `next` makes Express treat it as standard middleware.
2. **Why must `errorHandler` be defined last in `server.js`?** Express executes middleware sequentially in the order registered. If the error handler is declared before routes, errors forwarded via `next(err)` bypass it because they occur downstream.
3. **What is the difference between `app.use()` and route-specific middleware?** `app.use()` executes on every matching path prefix globally, whereas route-specific middleware is passed as arguments directly to specific router methods (e.g. `router.get('/:id', validateTaskId, handler)`).
4. **Scope Isolation:** Practical 4 uses in-memory storage only—no MongoDB, no Mongoose, no JWT.
