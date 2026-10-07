# Practical 11: Containerization with Docker and Docker Compose

## 1. Practical Title
**Practical 11: Containerization with Docker and Docker Compose**  
**Subject:** Advanced Web Development Frameworks (ITUE301)  
**Semester:** 5th Semester, Computer Engineering  
**Institution:** Charotar University of Science and Technology (CHARUSAT), FTE  

---

## 2. Objective
To containerize the complete full-stack application (React frontend, Express backend, and MongoDB database) using multi-stage Dockerfiles and orchestrate all three interdependent services with Docker Compose using isolated bridge networking, named volumes for database persistence, and a single-command startup workflow.

---

## 3. Technologies Used
- **Container Engine:** Docker (v20+)
- **Multi-Container Orchestration:** Docker Compose (v2+)
- **Base Images:** `node:18-alpine`, `mongo:6.0`
- **Application Stack:** React SPA + Express API + MongoDB + JWT Auth + `node-cache` + `EventEmitter`

---

## 4. Folder Structure
```
Practical_11_Docker/
├── docker-compose.yml           # Multi-service orchestration configuration
├── frontend/
│   ├── Dockerfile               # Multi-stage build (builder + runner)
│   ├── .dockerignore            # Excludes node_modules, dist, .env
│   ├── package.json
│   ├── vite.config.js
│   └── src/                     # Complete React UI from Practical 8
├── backend/
│   ├── Dockerfile               # Lean Node 18 Alpine production container
│   ├── .dockerignore            # Excludes node_modules, .env
│   ├── package.json
│   ├── server.js
│   ├── config/ (db.js, cache.js)
│   ├── events/ (taskEvents.js, taskListeners.js)
│   ├── models/ (Task.js, User.js)
│   ├── routes/ (authRoutes, taskRoutes, debugRoutes)
│   └── middleware/
├── verification.md              # Rubric checklist
└── README.md                    # Practical documentation
```

---

## 5. Architecture & Container Network Topology

```text
                      [ Host Machine / Web Browser ]
                             │               │
                             │ :5173         │ :5001
                             ▼               ▼
  ┌──────────────────────────────────────────────────────────────┐
  │                 Docker Network: app-network                  │
  │                                                              │
  │   ┌──────────────────┐               ┌──────────────────┐    │
  │   │ awdf-frontend    │               │ awdf-backend     │    │
  │   │ (React Vite SPA) │               │ (Express API)    │    │
  │   │ Port: 5173       │               │ Port: 5001       │    │
  │   └──────────────────┘               └─────────┬────────┘    │
  │                                                │             │
  │                        mongodb://mongodb:27017 │             │
  │                                                ▼             │
  │                                      ┌──────────────────┐    │
  │                                      │ awdf-mongodb     │    │
  │                                      │ (MongoDB 6.0)    │    │
  │                                      │ Port: 27017      │    │
  │                                      └─────────┬────────┘    │
  │                                                │             │
  └────────────────────────────────────────────────┼─────────────┘
                                                   ▼
                                         [ Named Volume ]
                                         (awdf-mongo-data)
```

---

## 6. Run Commands

### 1. Build and Start All 3 Services (Single Command):
```bash
docker compose up --build
```
Or in detached (background) mode:
```bash
docker compose up -d --build
```

### 2. Verify Container Health and Status:
```bash
docker compose ps
```
Expected output:
```
NAME            IMAGE                        STATUS                   PORTS
awdf-backend    practical_11_docker-backend  Up (healthy)             0.0.0.0:5001->5001/tcp
awdf-frontend   practical_11_docker-frontend Up                       0.0.0.0:5173->5173/tcp
awdf-mongodb    mongo:6.0                    Up (healthy)             0.0.0.0:27017->27017/tcp
```

### 3. Inspect Container Logs:
```bash
docker compose logs -f backend
```

### 4. Stop and Clean Up:
```bash
docker compose down
```
To also remove the persistent database volume:
```bash
docker compose down -v
```

---

## 7. Service Port Mappings & URLs
| Service | Internal Port | Host Mapped Port | Host URL / Connection String |
| :--- | :---: | :---: | :--- |
| **Frontend** | 5173 | 5173 | `http://localhost:5173` |
| **Backend** | 5001 | 5001 | `http://localhost:5001` |
| **MongoDB** | 27017 | 27017 | `mongodb://localhost:27017` (Host) or `mongodb://mongodb:27017` (Docker network) |

---

## 8. What Was Implemented
1. **Multi-Stage Frontend Dockerfile (`frontend/Dockerfile`):**
   - Stage 1 compiles React code with Vite and optimizes chunk bundles.
   - Stage 2 copies only static assets and serves them with minimal footprint on Node 18 Alpine.
2. **Backend Dockerfile (`backend/Dockerfile`):**
   - Installs production-only dependencies using `npm install --omit=dev`.
   - Embeds complete Practical 10 backend with JWT, caching, and EventEmitter.
3. **Official MongoDB Service:**
   - Deploys official `mongo:6.0` image with healthcheck to ensure backend does not attempt connection before the database is ready (`condition: service_healthy`).
4. **Service-to-Service Networking:**
   - Configured `MONGO_URI=mongodb://mongodb:27017/taskdb_docker`, resolving via Docker's embedded DNS server.
5. **Data Persistence via Named Volume:**
   - Configured `mongo-data` volume mapped to `/data/db` ensuring tasks persist even when containers are destroyed and recreated.
6. **Clean Build Contexts:**
   - Configured `.dockerignore` for both frontend and backend to block `node_modules` from bloating build contexts.

---

## 9. Testing & End-to-End Verification Instructions
1. Run `docker compose up --build`.
2. Confirm terminal shows:
   - `[DATABASE] MongoDB Connected: mongodb/taskdb_docker`
   - `Practical 10 Server running on port 5001`
   - `Vite preview server listening on http://0.0.0.0:5173`
3. Open `http://localhost:5173` in your browser.
4. Click **Sign In / Register** &rarr; create an account.
5. Add a task &rarr; observe immediate UI update and background `EventEmitter` timestamp logs in docker output.
6. Run `docker compose down && docker compose up -d`.
7. Refresh browser &rarr; confirm task persists from named volume.

---

## 10. Viva / Demo Discussion Points
1. **Why does backend use `mongodb://mongodb:27017` instead of `localhost`?** Inside Docker, each container possesses its own isolated network stack where `localhost` points to the container itself. To reach another container, services communicate through a Docker bridge network using the service names declared in `docker-compose.yml`, resolved by Docker's internal DNS.
2. **Why use a multi-stage Docker build for the React frontend?** Compiling React requires build tooling like Vite, Rollup, and development dependencies. Multi-stage builds discard compilers and source files after building `dist/`, producing a secure and compact production image.
3. **Why must `node_modules` be listed in `.dockerignore`?** Host-installed `node_modules` may contain platform-specific compiled binary bindings (such as macOS Darwin binaries) incompatible with Alpine Linux. Rebuilding inside the container with `npm install` guarantees Linux-compatible binaries and drastically speeds up image context transfer.
