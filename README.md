# ITUE301 Advanced Web Development Frameworks
## Practical Submission 1–11

**Student Name:** Kavy Amrutiya 
**Course Code:** ITUE301 (5th Semester)  
**Department:** Computer Engineering, FTE  
**University:** Charotar University of Science and Technology (CHARUSAT)  
**Authoritative Curriculum Reference:** `2026-27-ODD-ITUE301-AWF-PracticalList.pdf`  

---

## 1. Architectural Dependency Chain Map

The practicals in this submission are progressive and build upon previous milestones. Each practical folder represents a self-contained, independent snapshot containing the inherited codebase plus the specific practical requirements:

```text
P1 → P2 → P3

P4 → P5 → P6 → P7
                    ├→ P8
                    └→ P9 → P10
                              ↓
                             P11
```

### Detailed Flow:
- **P1 (React Components)** &rarr; **P2 (Routing & State)** &rarr; **P3 (Public REST API)**
- **P4 (Express In-Memory Backend)** &rarr; **P5 (MongoDB / Mongoose ODM)**
- **P6 (Full-Stack Integration):** Merges P3 React UI + P5 MongoDB Backend
- **P7 (JWT Authentication):** Adds authentication, bcrypt hashing, and protected routes to P6
- **P8 (Lazy Loading):** Implements `React.lazy()` route-level code splitting on P7 frontend
- **P9 (Caching):** Integrates `node-cache` (60s TTL) and invalidation pipelines on P7 backend
- **P10 (EventEmitter):** Adds asynchronous, non-blocking background notifications to P9 backend
- **P11 (Docker):** Full-stack containerization orchestrating React, Node/Express, and MongoDB via Docker Compose

---

## 2. Submission Structure

```text
AWDF_Submission/
├── README.md                                 # Master submission index & viva guide
├── .gitignore                                # Global exclusion for node_modules, dist, .env
│
├── Practical_01_React_Components/             # P1: React + Vite Component Architecture
│   ├── frontend/                             # Header, About, Skills, Footer + Props
│   ├── README.md                             # Comprehensive documentation
│   └── verification.md                       # Rubric verification checklist
│
├── Practical_02_Routing_State/                # P2: React Router v6 & Controlled State
│   ├── frontend/                             # Multi-route SPA, NavLink, Forms, Light/Dark
│   ├── README.md
│   └── verification.md
│
├── Practical_03_REST_API/                     # P3: GitHub REST API Consumption
│   ├── frontend/                             # useEffect, Spinner, ErrorMessage, Retry, Filter
│   ├── README.md
│   └── verification.md
│
├── Practical_04_Express_CRUD/                 # P4: RESTful API with Node.js & Express
│   ├── backend/                              # In-memory array, Logger, 415 validator, ErrorHandler
│   ├── README.md
│   └── verification.md
│
├── Practical_05_MongoDB_Mongoose/             # P5: MongoDB Integration & Schema Design
│   ├── backend/                              # Mongoose ODM, Task model, Pre-save trim, Enum
│   ├── README.md
│   └── verification.md
│
├── Practical_06_FullStack_Integration/        # P6: React + Node + MongoDB End-to-End
│   ├── frontend/                             # Central api.js, Toast notifications, ConfirmModal
│   ├── backend/                              # Express API with CORS enabled
│   ├── README.md
│   └── verification.md
│
├── Practical_07_JWT_Authentication/           # P7: Authentication & Middleware Pipeline
│   ├── frontend/                             # AuthModal, token storage, 401 interceptor, logout
│   ├── backend/                              # bcryptjs hashing, User model, JWT auth middleware
│   ├── README.md
│   └── verification.md
│
├── Practical_08_Lazy_Loading/                 # P8: Code Splitting & Performance Optimization
│   ├── frontend/                             # React.lazy(), Suspense fallback, dynamic chunks
│   ├── backend/                              # Full-stack backend preserved from P7
│   ├── docs/performance-report.md           # Real measured Vite build metrics & comparison
│   ├── README.md
│   └── verification.md
│
├── Practical_09_Caching/                      # P9: In-Memory Caching & Query Optimization
│   ├── backend/                              # node-cache (stdTTL 60s), cache invalidation, debug routes
│   ├── docs/cache-performance.md             # Experimental response-time benchmark report
│   ├── README.md
│   └── verification.md
│
├── Practical_10_EventEmitter/                 # P10: Event-Driven Asynchronous Processing
│   ├── backend/                              # Native EventEmitter, non-blocking response proof
│   ├── README.md
│   └── verification.md
│
└── Practical_11_Docker/                       # P11: Containerization with Docker Compose
    ├── docker-compose.yml                    # Multi-container orchestration (3 services)
    ├── frontend/ (Dockerfile, .dockerignore) # Multi-stage Vite production preview
    ├── backend/  (Dockerfile, .dockerignore) # Lean Node 18 production container
    ├── README.md
    └── verification.md
```

---

## 3. Practical Directory Summary & Evaluation Rubric Mapping

| Folder | Scope | Tech Stack | Evaluation Highlights |
| :--- | :--- | :--- | :--- |
| **Practical_01_React_Components** | Frontend Only | React 18, Vite | 4 isolated components (Header, About, Skills, Footer); dynamic array props |
| **Practical_02_Routing_State** | Frontend Only | React, Router v6 | `/`, `/projects`, `/contact`, `*`; controlled forms, character counter, light/dark theme |
| **Practical_03_REST_API** | Frontend Only | React, GitHub API | Asynchronous API fetching in `useEffect`, loading spinner, error alert with retry button |
| **Practical_04_Express_CRUD** | Backend Only | Express 4 | In-memory CRUD array, request logger, 415 Content-Type check, global error handler |
| **Practical_05_MongoDB_Mongoose** | Backend Only | Express, Mongoose | Schema validation, `priority` enum, pre-save title trim hook, ObjectId validator |
| **Practical_06_FullStack_Integration** | Full Stack | React + Express + Mongo | Central `api.js`, CORS enabled, end-to-end task CRUD, toast alerts, delete modal |
| **Practical_07_JWT_Authentication** | Full Stack | JWT, bcryptjs | User registration, login, hashed passwords, `auth` middleware, 401 handling |
| **Practical_08_Lazy_Loading** | Full Stack | React.lazy, Suspense | Route-based code splitting, fallback spinner, real build metrics in `docs/` |
| **Practical_09_Caching** | Backend + Docs | node-cache, Express | Cache-Aside pattern (60s TTL), invalidation on mutation, benchmark report in `docs/` |
| **Practical_10_EventEmitter** | Backend | Node EventEmitter | Non-blocking `task-created` / `task-deleted` events, timestamp logging proof |
| **Practical_11_Docker** | Full Stack + Docker | Docker Compose | Multi-stage frontend Dockerfile, lean backend container, official MongoDB 6.0 |

---

## 4. Instructions for Running Each Practical

Every practical contains its own `README.md` and `verification.md` checklist with dedicated run and test instructions.

### Frontend Practicals (P1, P2, P3):
```bash
cd <Practical_Folder>/frontend
npm install
npm run dev
# Vite runs at http://localhost:5173
```

### Backend Practicals (P4, P5, P9, P10):
```bash
cd <Practical_Folder>/backend
npm install
npm start
# Server listens on port 5001
```

### Full-Stack Practicals (P6, P7, P8):
Run the backend and frontend in separate terminals:
```bash
# Terminal 1 (Backend)
cd <Practical_Folder>/backend
npm install && npm start

# Terminal 2 (Frontend)
cd <Practical_Folder>/frontend
npm install && npm run dev
```

### Containerized Application (Practical 11):
Start all 3 services (`frontend`, `backend`, `mongodb`) with a single command:
```bash
cd Practical_11_Docker
docker compose up --build
```

---

## 5. Security & Environment Configuration

- **Zero Credentials Committed:** Real `.env` files are excluded via `.gitignore`.
- **Environment Templates:** Every database and backend practical provides a `.env.example` file:
  ```env
  PORT=5001
  MONGO_URI=mongodb://127.0.0.1:27017/taskdb
  JWT_SECRET=supersecretjwtkey_awdf_2026
  JWT_EXPIRE=1h
  ```
- **Portable Commands:** All instructions use relative paths with no hardcoded local-machine references.
