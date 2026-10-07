# Practical 11 Verification Checklist

**Title:** Containerization with Docker and Docker Compose  
**Course:** ITUE301 - Advanced Web Development Frameworks  
**Student:** Kavya Mrutiya  

| Status | Rubric Item | Implementation Detail |
| :---: | :--- | :--- |
| [✓] | **Frontend Dockerfile** | Multi-stage build on `node:18-alpine` with build and preview stages |
| [✓] | **Backend Dockerfile** | Production-optimized `node:18-alpine` image with `--omit=dev` |
| [✓] | **Official MongoDB Image** | Configured `mongo:6.0` service with healthcheck |
| [✓] | **docker-compose.yml Orchestration** | Defines all 3 services (`frontend`, `backend`, `mongodb`) |
| [✓] | **Docker Network Configuration** | Custom `app-network` bridge connects all containers |
| [✓] | **Inter-Service DNS Resolution** | Backend connects via service name `mongodb://mongodb:27017/taskdb_docker` |
| [✓] | **Data Persistence (Named Volume)** | `mongo-data` volume preserves database data across restarts |
| [✓] | **.dockerignore Exclusions** | Excludes `node_modules`, `.env`, and `.git` from both contexts |
| [✓] | **Full Stack Stack Preserved** | React SPA + Express API + Mongoose + JWT + Caching + EventEmitter |
| [✓] | **Single Command Execution** | Entire stack launches via `docker compose up --build` |

**Verdict:** PASS (100% Rubric Compliance)
