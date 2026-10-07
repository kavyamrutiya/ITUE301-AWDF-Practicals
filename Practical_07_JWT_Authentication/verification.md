# Practical 7 Verification Checklist

**Title:** Authentication and Middleware Pipeline  
**Course:** ITUE301 - Advanced Web Development Frameworks  
**Student:** Kavya Mrutiya  

| Status | Rubric Item | Implementation Detail |
| :---: | :--- | :--- |
| [✓] | **User Registration** | `POST /api/auth/register` hashes password with bcrypt (10 rounds) before save |
| [✓] | **JWT Login Flow** | `POST /api/auth/login` checks credentials via `bcrypt.compare`, signs JWT (1h expiry) |
| [✓] | **Auth Middleware** | `middleware/auth.js` verifies `Bearer <token>`, attaches `req.user`, protects `/tasks` |
| [✓] | **401 Unauthorized Protection** | Missing/invalid/expired token returns structured 401 without crashing |
| [✓] | **Server-Side Input Validation** | `validateAuth.js` enforces 3 rules (name minlength, valid email regex, password min 6) |
| [✓] | **GET /api/auth/me Endpoint** | Protected route returns authenticated user data |
| [✓] | **Frontend Token Storage** | Stores token in `localStorage`, injects Bearer header in `api.js` |
| [✓] | **Frontend 401 & Logout** | Catches 401, clears token, opens login modal; navbar logout button |
| [✓] | **Environment Variable Isolation** | `JWT_SECRET` loaded via dotenv, template in `.env.example` |

**Verdict:** PASS (100% Rubric Compliance)
