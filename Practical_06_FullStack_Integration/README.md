# Practical 6: Full Stack Integration React + Node + MongoDB

## 1. Practical Title
**Practical 6: Full Stack Integration React + Node + MongoDB**  
**Subject:** Advanced Web Development Frameworks (ITUE301)  
**Semester:** 5th Semester, Computer Engineering  
**Institution:** Charotar University of Science and Technology (CHARUSAT), FTE  

---

## 2. Objective
To integrate the React frontend built in Practicals 1–3 with the Express and MongoDB/Mongoose backend built in Practical 5 into a complete, self-contained, end-to-end full-stack application supporting asynchronous CRUD operations, state synchronization, CORS communication, delete confirmation dialogs, and toast notifications.

---

## 3. Technologies Used
- **Frontend:** React 18+, Vite, React Router v6, Fetch API
- **Backend:** Node.js, Express.js 4+, CORS
- **Database:** MongoDB, Mongoose ODM
- **Communication Protocol:** RESTful HTTP over JSON

---

## 4. Folder Structure
```
Practical_06_FullStack_Integration/
├── frontend/                    # Independent React SPA (Port 5173)
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── api/
│       │   └── api.js           # Centralized API service (BASE_URL: http://localhost:5001)
│       ├── components/
│       │   ├── NavBar.jsx       # SPA Navigation
│       │   ├── Spinner.jsx      # Async loading indicator
│       │   ├── ErrorMessage.jsx # Error state with retry
│       │   ├── Toast.jsx        # Success/failure notifications
│       │   └── ConfirmModal.jsx # Delete confirmation modal
│       └── pages/
│           ├── Home.jsx         # Portfolio Home
│           ├── Tasks.jsx        # Complete CRUD Task Management UI
│           ├── Contact.jsx      # Controlled contact form
│           └── NotFound.jsx     # 404 Route
├── backend/                     # Independent Express + MongoDB Server (Port 5001)
│   ├── package.json             # Express, Mongoose, dotenv, cors
│   ├── server.js                # CORS enabled Express server
│   ├── config/db.js             # Mongoose database connector
│   ├── models/Task.js           # Mongoose Task schema
│   ├── controllers/taskController.js # CRUD business logic
│   ├── routes/taskRoutes.js     # /tasks router
│   └── middleware/              # Logger, Content-Type, 404, ErrorHandler
├── verification.md              # Rubric checklist
└── README.md                    # Practical documentation
```

---

## 5. Installation Steps
Both frontend and backend are self-contained and independently configured:

1. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```
2. **Install Frontend Dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

---

## 6. Run Commands
Run frontend and backend concurrently in separate terminal windows:

### Terminal 1 (Backend):
```bash
cd backend
npm start
# Server listens at http://localhost:5001
```

### Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
# Vite runs at http://localhost:5173
```

---

## 7. API Endpoints
All endpoints are consumed dynamically by `frontend/src/api/api.js`:
| HTTP Method | Backend Route | UI Action |
| :--- | :--- | :--- |
| `GET` | `/tasks` | Renders tasks list on page load / search / filter |
| `POST` | `/tasks` | Submits new task from form into MongoDB |
| `PUT` | `/tasks/:id` | Toggles completed checkbox or modifies title/priority |
| `DELETE` | `/tasks/:id` | Triggered after user confirms deletion in modal |

---

## 8. MongoDB Setup
Ensure local MongoDB is active or specify your Atlas connection string in `backend/.env`:
```
MONGO_URI=mongodb://127.0.0.1:27017/taskdb_practical6
PORT=5001
```

---

## 9. Docker Commands
*Not applicable for Practical 6.* (Docker is introduced in Practical 11).

---

## 10. What Was Implemented
1. **Full Stack Architecture:** Clean separation between frontend (React client) and backend (Express REST API).
2. **CORS Enabling:** Implemented `cors()` middleware on Express to permit cross-origin requests from `http://localhost:5173`.
3. **Centralized Frontend API Client (`api.js`):** Modular request functions with error handling and configurable `BASE_URL`.
4. **End-to-End CRUD Flow:**
   - **Create:** Input form sends POST to `/tasks`, saves to MongoDB, shows success toast, and refreshes local state.
   - **Read:** Mounts in `useEffect()`, displays `<Spinner />`, parses tasks array from MongoDB.
   - **Update:** Checkbox toggles task completion state; Edit modal updates title and priority in MongoDB.
   - **Delete:** Intercepts delete click with `ConfirmModal` dialog; on confirmation, issues DELETE to backend.
5. **State Synchronization:** Confirmed data persistence by creating tasks, refreshing browser, and seeing records retained from MongoDB.
6. **Toast Feedback System:** Visual toast alerts notify the user upon successful save, edit, and deletion.

---

## 11. Testing Instructions
1. Start backend: `cd backend && npm start`.
2. Start frontend: `cd frontend && npm run dev`.
3. Open `http://localhost:5173/tasks` in your browser.
4. Fill out the task form with title *"Finish Practical 6"* and click **Save Task**.
5. Observe the green success toast notification and new task card appearing.
6. Refresh the browser page (`Cmd+R` / `F5`) &rarr; confirm task persists from MongoDB!
7. Click the checkbox next to the task to toggle completed status.
8. Click **🗑️ Delete** &rarr; confirm modal appears &rarr; click **Yes, Delete Task** &rarr; verify task is removed.

---

## 12. Viva / Demo Discussion Points
1. **What is CORS and why is it necessary?** Cross-Origin Resource Sharing (CORS) is a browser security mechanism that blocks requests made by JavaScript from one origin (domain/port, e.g. 5173) to a different origin (e.g. 5001) unless the target server explicitly sends allowed CORS headers (`Access-Control-Allow-Origin`).
2. **Why synchronize state rather than optimistic assumption?** While optimistic UI updates make apps feel snappy, network failures or validation rejections can cause desynchronization between what the user sees and what is stored in the database. Awaiting server confirmation or re-fetching ensures single source of truth.
3. **Why centralize API calls in `api.js`?** Centralization decouples UI components from networking details, simplifies environment switching, and provides a single place for error normalization and auth header injection.
