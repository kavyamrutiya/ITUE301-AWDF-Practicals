# Practical 6 Verification Checklist

**Title:** Full Stack Integration React + Node + MongoDB  
**Course:** ITUE301 - Advanced Web Development Frameworks  
**Student:** Kavya Mrutiya  

| Status | Rubric Item | Implementation Detail |
| :---: | :--- | :--- |
| [✓] | **Frontend-Backend Integration** | React frontend calls Express backend endpoints via central `api.js` |
| [✓] | **CORS Configuration** | `cors()` middleware enabled on Express; zero CORS errors in console |
| [✓] | **Create Operation (POST)** | Submits task form, writes to MongoDB, updates UI list |
| [✓] | **Read Operation (GET)** | Fetches persisted tasks on load with loading spinner |
| [✓] | **Update Operation (PUT)** | Toggles completed status and edits task details in database |
| [✓] | **Delete Operation (DELETE)** | Removes task document from database upon confirmation |
| [✓] | **Delete Confirmation Dialog** | `<ConfirmModal />` prevents accidental task deletion |
| [✓] | **Toast Notifications** | `<Toast />` provides feedback for success/error operations |
| [✓] | **Persistence Verification** | Data persists across browser refresh through MongoDB |
| [✓] | **Self-Contained Structure** | Independent `frontend/` and `backend/` folders each with own `package.json` |

**Verdict:** PASS (100% Rubric Compliance)
