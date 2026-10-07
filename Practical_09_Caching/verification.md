# Practical 9 Verification Checklist

**Title:** In-Memory Caching and Query Optimization  
**Course:** ITUE301 - Advanced Web Development Frameworks  
**Student:** Kavya Mrutiya  

| Status | Rubric Item | Implementation Detail |
| :---: | :--- | :--- |
| [✓] | **node-cache Setup** | Installed and initialized in `config/cache.js` with `stdTTL: 60` |
| [✓] | **Cache on GET /tasks** | Checks `all_tasks` key; returns cached data on HIT; queries DB on MISS |
| [✓] | **Single-Task Cache** | `GET /tasks/:id` cached separately under `task_<id>` |
| [✓] | **Cache Invalidation on POST** | `cache.del('all_tasks')` called on task creation |
| [✓] | **Cache Invalidation on PUT** | `all_tasks` and `task_<id>` keys invalidated on update |
| [✓] | **Cache Invalidation on DELETE** | `all_tasks` and `task_<id>` keys invalidated on deletion |
| [✓] | **Debug & Telemetry Endpoint** | `GET /api/debug/cache` exposes hits, misses, hit rate %, and keys |
| [✓] | **JWT Auth Preserved** | Inherited from Practical 7; task routes remain JWT protected |
| [✓] | **Empirical Response Time Study** | `scripts/benchmark.js` captures real response times in `docs/cache-performance.md` |

**Verdict:** PASS (100% Rubric Compliance)
