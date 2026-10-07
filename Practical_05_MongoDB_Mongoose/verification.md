# Practical 5 Verification Checklist

**Title:** MongoDB Integration and Schema Design with Mongoose  
**Course:** ITUE301 - Advanced Web Development Frameworks  
**Student:** Kavya Mrutiya  

| Status | Rubric Item | Implementation Detail |
| :---: | :--- | :--- |
| [✓] | **MongoDB & Mongoose Connection** | `config/db.js` connects via `MONGO_URI` using dotenv |
| [✓] | **Task Schema Structure** | Schema includes title, description, completed, priority, createdAt |
| [✓] | **Priority Enum Validation** | Restricted to `['low', 'medium', 'high']` with descriptive error |
| [✓] | **Pre-Save Trim Hook** | `taskSchema.pre('save')` strips leading/trailing whitespace |
| [✓] | **Real Mongoose CRUD** | Uses `Task.find()`, `create()`, `findById()`, `findByIdAndUpdate()`, `findByIdAndDelete()` |
| [✓] | **GET /tasks/:id (404 Handling)** | Returns clean 404 JSON when document does not exist |
| [✓] | **ObjectId Validation** | Intercepts invalid IDs with 400 Bad Request before querying DB |
| [✓] | **Structured Error Responses** | Global error handler formats `ValidationError` into clean array/string |
| [✓] | **In-Memory Storage Removed** | In-memory array completely replaced by database operations |
| [✓] | **Environment Config (.env.example)** | `.env.example` provided; `.env` excluded via `.gitignore` |

**Verdict:** PASS (100% Rubric Compliance)
