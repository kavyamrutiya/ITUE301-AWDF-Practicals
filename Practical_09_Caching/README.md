# Practical 9: In-Memory Caching and Query Optimization

## 1. Practical Title
**Practical 9: In-Memory Caching and Query Optimization**  
**Subject:** Advanced Web Development Frameworks (ITUE301)  
**Semester:** 5th Semester, Computer Engineering  
**Institution:** Charotar University of Science and Technology (CHARUSAT), FTE  

---

## 2. Objective
To implement server-side in-memory caching using `node-cache` following the Cache-Aside pattern, eliminate redundant MongoDB queries for repeated read requests, implement strict cache invalidation on write mutations (Create, Update, Delete), and scientifically benchmark HTTP response time improvements.

---

## 3. Technologies Used
- **Backend Framework:** Express.js 4+ on Node.js
- **Database:** MongoDB & Mongoose
- **Caching Engine:** `node-cache` (Process-Local In-Memory Key-Value Store)
- **Security:** JWT Authentication from Practical 7
- **Benchmarking:** Node.js High-Resolution Timers (`process.hrtime.bigint`)

---

## 4. Folder Structure
```
Practical_09_Caching/
├── backend/
│   ├── .env.example
│   ├── package.json             # Includes node-cache, bcryptjs, jsonwebtoken
│   ├── server.js                # App bootstrap & /debug route mounting
│   ├── config/
│   │   ├── db.js                # MongoDB connection
│   │   └── cache.js             # node-cache instance, counters, helper methods
│   ├── controllers/
│   │   ├── authController.js    # JWT authentication
│   │   └── taskController.js    # Caching on GET, invalidation on POST/PUT/DELETE
│   ├── routes/
│   │   ├── authRoutes.js        # Authentication endpoints
│   │   ├── taskRoutes.js        # Protected task endpoints
│   │   └── debugRoutes.js       # /cache, /reset, /clear, /toggle
│   ├── scripts/
│   │   └── benchmark.js         # Automated response-time measurement suite
│   └── middleware/              # auth, logger, validateContentType, errorHandler
├── docs/
│   └── cache-performance.md     # Comparative response-time analysis & tables
├── verification.md              # Rubric checklist
└── README.md                    # Practical documentation
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
2. Execute automated benchmark suite:
   ```bash
   npm run benchmark
   ```

---

## 7. API Endpoints
| HTTP Method | Route | Description | Caching Behavior |
| :--- | :--- | :--- | :--- |
| `GET` | `/tasks` | Read all tasks | Checks `all_tasks`. HIT &rarr; returns cache; MISS &rarr; queries DB + caches |
| `GET` | `/tasks/:id` | Read task by ID | Checks `task_<id>` in cache |
| `POST` | `/tasks` | Create task | Invalidates `all_tasks` |
| `PUT` | `/tasks/:id` | Update task | Invalidates `all_tasks` and `task_<id>` |
| `DELETE` | `/tasks/:id` | Delete task | Invalidates `all_tasks` and `task_<id>` |
| `GET` | `/api/debug/cache` | Cache statistics | Returns hits, misses, hit rate %, keys |
| `POST` | `/api/debug/cache/reset` | Reset counters | Clears hit/miss counters |
| `POST` | `/api/debug/cache/toggle` | Toggle cache | Enables or disables cache dynamically |

---

## 8. MongoDB Setup
In `backend/.env`:
```
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/taskdb_practical9
JWT_SECRET=supersecretjwtkey_awdf_2026_practical9
JWT_EXPIRE=1h
```

---

## 9. Docker Commands
*Not applicable for Practical 9.* (Containerization is Practical 11).

---

## 10. What Was Implemented
1. **Inherited Practical 7 Base:** Maintained full JWT security and user authentication.
2. **Cache-Aside Pattern (`config/cache.js`):**
   - Configured `node-cache` with standard Time-to-Live (`stdTTL: 60s`).
   - Deep-cloning enabled (`useClones: true`) to prevent memory leak mutations.
3. **Read Optimization:**
   - On `GET /tasks`: Checks `cache.get('all_tasks')`. Returns instantly on HIT without touching MongoDB.
4. **Transactional Cache Invalidation:**
   - Any state mutation (`POST`, `PUT`, `DELETE`) immediately deletes affected keys (`all_tasks` and `task_<id>`), ensuring stale data is never served.
5. **Debug Telemetry Endpoints (`debugRoutes.js`):**
   - Live endpoints for inspecting cache hit rates and keys.
6. **Automated Benchmark Suite (`scripts/benchmark.js`):**
   - Runs fair, reproducible latency comparisons over HTTP.

---

## 11. Testing & Benchmark Instructions
1. Start server: `npm start`.
2. In another terminal, run: `npm run benchmark`.
3. Observe terminal output comparing 3 uncached samples vs 3 cached samples.
4. Verify debug telemetry via cURL:
   ```bash
   curl http://localhost:5001/api/debug/cache
   ```

---

## 12. Viva / Demo Discussion Points
1. **What is the Cache-Aside pattern?** The application code directly queries the cache before accessing the database. If data is present (cache hit), it returns it immediately. If missing (cache miss), the app queries the database, writes the result to cache, and returns it.
2. **Why must write operations invalidate the cache?** Without invalidation, clients querying the cache within the 60-second TTL window would receive stale data that doesn't reflect recent creates, updates, or deletes.
3. **What are the limitations of `node-cache`?** `node-cache` is in-process memory. It resets when the Node process restarts and cannot be shared across multiple instances in a clustered or multi-container environment (which requires a distributed cache like Redis).
