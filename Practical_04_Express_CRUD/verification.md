# Practical 4 Verification Checklist

**Title:** Building a RESTful API with Node.js and Express  
**Course:** ITUE301 - Advanced Web Development Frameworks  
**Student:** Kavya Mrutiya  

| Status | Rubric Item | Implementation Detail |
| :---: | :--- | :--- |
| [✓] | **Express Server Setup** | Configured Express application running on configurable port |
| [✓] | **GET /tasks** | Returns all tasks with count and 200 OK |
| [✓] | **GET /tasks/:id** | Returns specific task with 200 OK, returns 404 on invalid ID |
| [✓] | **POST /tasks** | Creates new task in array, validates title, returns 201 Created |
| [✓] | **PUT /tasks/:id** | Updates task properties, returns 200 OK, returns 404 if absent |
| [✓] | **DELETE /tasks/:id** | Removes task from array, returns 200 OK with deleted entity |
| [✓] | **Request Logging Middleware** | Custom middleware logs Method, URL, and ISO timestamp globally |
| [✓] | **Global Error Handler** | 4-argument `(err, req, res, next)` placed strictly last |
| [✓] | **Custom 404 Handler** | Catch-all middleware returns structured JSON for undefined paths |
| [✓] | **Content-Type Validation** | Rejects non-JSON write requests with 415 status code |
| [✓] | **Scope Isolation** | Uses in-memory array storage; MongoDB is NOT used |

**Verdict:** PASS (100% Rubric Compliance)
