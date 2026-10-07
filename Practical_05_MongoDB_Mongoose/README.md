# Practical 5: MongoDB Integration and Schema Design with Mongoose

## 1. Practical Title
**Practical 5: MongoDB Integration and Schema Design with Mongoose**  
**Subject:** Advanced Web Development Frameworks (ITUE301)  
**Semester:** 5th Semester, Computer Engineering  
**Institution:** Charotar University of Science and Technology (CHARUSAT), FTE  

---

## 2. Objective
To connect a MongoDB database to the Express backend built in Practical 4, replace the temporary in-memory array storage with real Mongoose model operations, and enforce strict data schema validation (required fields, enum priority, pre-save whitespace trimming, and 404 handling).

---

## 3. Technologies Used
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js 4+
- **Database:** MongoDB
- **Object Data Modeling (ODM):** Mongoose 8+
- **Configuration:** dotenv (`.env` file)

---

## 4. Folder Structure
```
Practical_05_MongoDB_Mongoose/
├── backend/
│   ├── .env.example             # Template for environment configuration
│   ├── .gitignore               # Excludes .env and node_modules
│   ├── package.json             # Express, Mongoose, dotenv
│   ├── server.js                # Express app & Mongoose DB bootstrap
│   ├── config/
│   │   └── db.js                # Mongoose connection logic
│   ├── models/
│   │   └── Task.js              # Mongoose schema, validation, pre-save hook
│   ├── controllers/
│   │   └── taskController.js    # Mongoose CRUD: find, create, findById...
│   ├── routes/
│   │   └── taskRoutes.js        # Express routes with ObjectId validation
│   └── middleware/
│       ├── logger.js            # Request logger
│       ├── validateContentType.js# 415 content-type enforcement
│       ├── validateObjectId.js  # 24-character hex ObjectId validator
│       ├── notFound.js          # 404 handler
│       └── errorHandler.js     # Mongoose ValidationError formatter
├── verification.md              # Rubric checklist
└── README.md                    # Practical documentation
```

---

## 5. Installation Steps
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create your `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
3. Install dependencies:
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

---

## 7. API Endpoints
| HTTP Method | Route | Description | Expected Status |
| :--- | :--- | :--- | :---: |
| `GET` | `/tasks` | Query all tasks from MongoDB (supports search, sort, filter) | `200 OK` |
| `GET` | `/tasks/:id` | Fetch single task by 24-char ObjectId | `200 OK` or `404 Not Found` |
| `POST` | `/tasks` | Create validated task document in MongoDB | `201 Created` or `400 Validation Error` |
| `PUT` | `/tasks/:id` | Update task with `runValidators: true` | `200 OK` or `404 Not Found` |
| `DELETE` | `/tasks/:id` | Permanently remove task document | `200 OK` or `404 Not Found` |

---

## 8. MongoDB Setup
1. Ensure MongoDB service is running locally on port 27017 or use MongoDB Compass.
2. In `.env`, set:
   ```
   MONGO_URI=mongodb://127.0.0.1:27017/taskdb_practical5
   ```
3. When the server launches, verify the console log:
   ```
   [DATABASE] MongoDB Connected: 127.0.0.1/taskdb_practical5
   ```

---

## 9. Docker Commands
*Not applicable for Practical 5.* (Containerization is Practical 11).

---

## 10. What Was Implemented
1. **Inherited Practical 4 Base:** Reused logging middleware, Content-Type enforcement, 404 handler, and error pipeline.
2. **Eliminated In-Memory Array:** Completely transitioned persistence to MongoDB using Mongoose models.
3. **Task Schema Design (`models/Task.js`):**
   - `title`: String, required, minlength: 3, automatically trimmed.
   - `description`: String, trimmed.
   - `completed`: Boolean, default: false.
   - `priority`: String, enum: `['low', 'medium', 'high']`, default: 'medium'.
   - `dueDate`: Date.
   - `timestamps: true`: Auto-generated `createdAt` and `updatedAt`.
4. **Pre-Save Mongoose Hook:** Implemented `taskSchema.pre('save')` hook to automatically trim leading/trailing whitespace from `title`.
5. **Mongoose Model CRUD Operations:**
   - `Task.find(filter)`
   - `Task.create(payload)`
   - `Task.findById(id)`
   - `Task.findByIdAndUpdate(id, payload, { new: true, runValidators: true })`
   - `Task.findByIdAndDelete(id)`
6. **Robust ObjectId Validation:** Route-level middleware `validateObjectId.js` intercepts non-hex IDs before querying MongoDB, returning `400 Bad Request`.
7. **Structured Validation Errors:** Centralized `errorHandler` maps Mongoose `ValidationError` to clean, human-readable JSON.

---

## 11. Testing Instructions
1. Run `npm start`. Confirm MongoDB connection log appears.
2. **Create Task:**
   ```bash
   curl -X POST http://localhost:5001/tasks      -H "Content-Type: application/json"      -d '{"title": " Complete Practical 5 Submission ", "priority": "high"}'
   ```
   Notice that the title is trimmed automatically by the pre-save hook.
3. **Invalid Priority (Enum Test):**
   ```bash
   curl -X POST http://localhost:5001/tasks      -H "Content-Type: application/json"      -d '{"title": "Test", "priority": "urgent"}'
   ```
   Verify `400 Bad Request` with message: *"Priority must be either low, medium, or high"*.
4. **Fetch Single Task (404 Test):**
   ```bash
   curl http://localhost:5001/tasks/66a000000000000000000000
   ```
   Verify `404 Not Found`.

---

## 12. Viva / Demo Discussion Points
1. **Why use Mongoose schemas with a NoSQL database?** MongoDB is natively schema-less at the database engine level. Mongoose provides application-level schema enforcement, data type casting, validation rules, default values, and lifecycle middleware (hooks) to ensure data integrity across team environments.
2. **What does `{ runValidators: true }` do in `findByIdAndUpdate`?** By default, Mongoose only executes schema validators on `.save()` or `.create()`. Setting `runValidators: true` forces Mongoose to validate updated fields during update operations.
3. **What is a pre-save hook?** A Mongoose middleware function executed right before a document is written to MongoDB. It is ideal for sanitization (like trimming strings) and security (like hashing passwords).
4. **Scope Isolation:** Practical 5 introduces MongoDB and Mongoose—no React frontend integration (P6) and no JWT authentication (P7) yet.
