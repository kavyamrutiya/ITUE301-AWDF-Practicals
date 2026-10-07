# Practical 7: Authentication and Middleware Pipeline

## 1. Practical Title
**Practical 7: Authentication and Middleware Pipeline**  
**Subject:** Advanced Web Development Frameworks (ITUE301)  
**Semester:** 5th Semester, Computer Engineering  
**Institution:** Charotar University of Science and Technology (CHARUSAT), FTE  

---

## 2. Objective
To implement JSON Web Token (JWT) based user authentication, password hashing using `bcryptjs`, and server-side request validation within the Express middleware pipeline, protecting all Task Management routes and handling 401 Unauthorized states gracefully in the React client.

---

## 3. Technologies Used
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Security:** `bcryptjs` (Salt Rounds 10), `jsonwebtoken` (Signed HS256 tokens)
- **Frontend:** React 18+, Vite, React Router v6, LocalStorage
- **Architecture:** Middleware Pipeline with Bearer Token Authorization

---

## 4. Folder Structure
```
Practical_07_JWT_Authentication/
├── backend/
│   ├── .env.example             # Config for PORT, MONGO_URI, JWT_SECRET, JWT_EXPIRE
│   ├── package.json             # Added bcryptjs, jsonwebtoken
│   ├── server.js                # Mounts /api/auth and protected /api/tasks
│   ├── models/
│   │   ├── User.js              # User schema with bcrypt pre-save hashing
│   │   └── Task.js              # Mongoose Task schema
│   ├── middleware/
│   │   ├── auth.js              # Verifies Bearer token, sets req.user (401 handler)
│   │   ├── validateAuth.js      # Server-side validation rules (name, email, password)
│   │   └── logger.js, validateContentType.js, validateObjectId.js, notFound.js, errorHandler.js
│   ├── controllers/
│   │   ├── authController.js    # Register, login, and getMe endpoints
│   │   └── taskController.js    # Protected task CRUD actions
│   └── routes/
│       ├── authRoutes.js        # /register, /login, /me
│       └── taskRoutes.js        # Protected with auth middleware
├── frontend/
│   ├── package.json
│   ├── src/
│   │   ├── api/api.js           # Attaches Authorization: Bearer <token> & 401 handler
│   │   ├── components/
│   │   │   ├── NavBar.jsx       # Shows user name, login modal trigger, and logout
│   │   │   ├── AuthModal.jsx    # Login / Register tabs with input validation
│   │   │   └── ... (Toast, ConfirmModal, Spinner, ErrorMessage)
│   │   └── pages/
│   │       ├── Tasks.jsx        # Protected task CRUD page
│   │       └── ...
├── verification.md
└── README.md
```

---

## 5. Installation Steps
1. **Backend:**
   ```bash
   cd backend
   cp .env.example .env
   npm install
   ```
2. **Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

---

## 6. Run Commands
### Terminal 1 (Backend):
```bash
cd backend
npm start
# Listens at http://localhost:5001
```

### Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
# Vite runs at http://localhost:5173
```

---

## 7. API Endpoints
| HTTP Method | Route | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Validates input, hashes password, saves User, returns JWT |
| `POST` | `/api/auth/login` | Public | Validates credentials with `bcrypt.compare`, returns 1h JWT |
| `GET` | `/api/auth/me` | Protected | Returns authenticated user details from decoded token |
| `GET` | `/api/tasks` | Protected | Requires `Authorization: Bearer <token>` |
| `POST` | `/api/tasks` | Protected | Requires `Authorization: Bearer <token>` |
| `PUT` | `/api/tasks/:id` | Protected | Requires `Authorization: Bearer <token>` |
| `DELETE` | `/api/tasks/:id` | Protected | Requires `Authorization: Bearer <token>` |

---

## 8. MongoDB Setup
In `backend/.env`:
```
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/taskdb_practical7
JWT_SECRET=supersecretjwtkey_awdf_2026_practical7
JWT_EXPIRE=1h
```

---

## 9. Docker Commands
*Not applicable for Practical 7.* (Docker is Practical 11).

---

## 10. What Was Implemented
1. **User Schema & Password Hashing (`models/User.js`):**
   - Pre-save Mongoose hook generates a 10-round bcrypt salt and hashes the plain password before storage. Passwords are never stored in plain text.
2. **JWT Authentication Pipeline (`authController.js`):**
   - Signed JWTs generated with `jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' })`.
3. **Route Protection Middleware (`middleware/auth.js`):**
   - Intercepts `Authorization: Bearer <token>` header, verifies signature using `jwt.verify()`, queries database, and attaches decoded user to `req.user`.
   - Returns clean `401 Unauthorized` without server crashes on invalid, expired, or absent tokens.
4. **Server-Side Input Validation (`middleware/validateAuth.js`):**
   - Rule 1: Full name required with minlength 2.
   - Rule 2: Email format strictly checked with regex.
   - Rule 3: Password requires minimum 6 characters.
5. **Frontend 401 Handling & Logout:**
   - Central `api.js` automatically passes `Authorization: Bearer <token>`.
   - On 401 response, `api.js` purges stored token from `localStorage` and emits an event prompting the user to sign in.
   - Logout button in navbar clears tokens and restores public guest state.

---

## 11. Testing Instructions
1. Run backend (`PORT=5001`) and frontend (`PORT=5173`).
2. Test protected task endpoint directly via cURL without token:
   ```bash
   curl http://localhost:5001/tasks
   ```
   Verify: `401 Unauthorized` - *"Access denied. No authentication token provided"*.
3. Register a new user:
   ```bash
   curl -X POST http://localhost:5001/api/auth/register      -H "Content-Type: application/json"      -d '{"name":"Kavya","email":"kavya@test.com","password":"mypassword123"}'
   ```
   Save the returned `token`.
4. Access protected tasks using the token:
   ```bash
   curl http://localhost:5001/tasks      -H "Authorization: Bearer <YOUR_TOKEN>"
   ```
   Verify: `200 OK` with task array!
5. In browser at `http://localhost:5173`, click **Sign In / Register**, enter details, and observe your profile appearing in the navbar. Add, edit, and delete tasks seamlessly with JWT authorization.

---

## 12. Viva / Demo Discussion Points
1. **Why use bcrypt instead of plain SHA256?** SHA256 is designed to be fast, making it vulnerable to GPU brute-force attacks. Bcrypt is intentionally slow and CPU-intensive, utilizing adaptive salting to protect against rainbow table lookups.
2. **What does a JWT contain?** A JWT consists of three base64url-encoded parts: Header (algorithm), Payload (claims such as user ID and expiration), and Signature (HMAC of header + payload using `JWT_SECRET`).
3. **Why validate on the server if client-side validation is already present?** Client-side validation improves user experience, but can be easily bypassed by direct API calls (e.g. cURL, Postman). Server-side validation is mandatory for application security.
