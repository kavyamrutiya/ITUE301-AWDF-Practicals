# Practical 3: API Integration and Data Rendering in React

## 1. Practical Title
**Practical 3: API Integration and Data Rendering in React**  
**Subject:** Advanced Web Development Frameworks (ITUE301)  
**Semester:** 5th Semester, Computer Engineering  
**Institution:** Charotar University of Science and Technology (CHARUSAT), FTE  

---

## 2. Objective
To consume a public REST API (GitHub API) in React and handle asynchronous data states correctly, including pending loading states, data rendering, error handling, search filtering, and retry mechanisms.

---

## 3. Technologies Used
- **Runtime:** Node.js (v18+), npm
- **Build Tool:** Vite 5+
- **Frontend Framework:** React 18+ (`useState`, `useEffect`)
- **Routing:** React Router v6
- **REST API:** GitHub Public REST API (`https://api.github.com/users/<username>/repos`)
- **Styling:** CSS Custom Properties, Animations, Responsive Grid

---

## 4. Folder Structure
```
Practical_03_REST_API/
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   └── src/
│       ├── main.jsx             # Wraps with BrowserRouter
│       ├── App.jsx              # Routing and Theme State
│       ├── index.css            # Global styling + keyframe spin animation
│       ├── components/          # Reusable components
│       │   ├── Spinner.jsx      # Loading indicator component
│       │   ├── ErrorMessage.jsx # Error alert with Retry button
│       │   ├── NavBar.jsx       # SPA navigation bar
│       │   ├── Header.jsx       # Inherited from Practical 1
│       │   ├── About.jsx        # Inherited from Practical 1
│       │   ├── Skills.jsx       # Inherited from Practical 1
│       │   └── Footer.jsx       # Inherited from Practical 1
│       └── pages/
│           ├── Home.jsx         # Portfolio Home
│           ├── Projects.jsx     # Integration point for GitHub REST API
│           ├── Contact.jsx      # Controlled contact form
│           └── NotFound.jsx     # 404 Route
├── verification.md              # Rubric checklist
└── README.md                    # Practical documentation
```

---

## 5. Installation Steps
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

---

## 6. Run Commands
1. Start development server:
   ```bash
   npm run dev
   ```
2. Open your browser:
   ```
   http://localhost:5173/projects
   ```
3. Test production build:
   ```bash
   npm run build
   ```

---

## 7. API Endpoints
- **External Public API:** `GET https://api.github.com/users/kavyamrutiya/repos?sort=updated&per_page=12`
- Consumed inside `Projects.jsx` through asynchronous fetch in `useEffect()`.

---

## 8. MongoDB Setup
*Not applicable for Practical 3.* (Private backend and database integration commence in Practical 5 and 6).

---

## 9. Docker Commands
*Not applicable for Practical 3.* (Containerization is Practical 11).

---

## 10. What Was Implemented
1. **Inherited Practical 1 & 2 Base:** Maintained entire routing infrastructure, controlled contact form, and theme toggle.
2. **Asynchronous API Consumption:** Invoked GitHub REST API inside `useEffect()` on component mount with dependency array `[username]`.
3. **State Management:** Handled 3 primary states with `useState`:
   - `repos` (successful data array)
   - `loading` (boolean loading indicator)
   - `error` (error string or null)
4. **Loading Spinner Component (`Spinner.jsx`):** Renders rotating CSS animation while network request is pending.
5. **Error Component with Retry (`ErrorMessage.jsx`):** Displays clean alert with a clickable **🔄 Retry Fetch** button that re-fires the fetch function.
6. **Data Presentation:** Renders repository cards with name, description, primary language badge, GitHub URL link, and star count (`stargazers_count`).
7. **Client-Side Search/Filter:** Filter input allows real-time filtering of repositories by name, language, or description.

---

## 11. Testing Instructions
1. Run `npm run dev` and navigate to `/projects`.
2. Notice the `<Spinner />` appears briefly while the GitHub API request is in-flight.
3. Observe the rendered list of repositories displaying repository names, star counts, and external links.
4. Type a query into the search box (e.g., `Task` or `JavaScript`). Confirm that the list filters immediately.
5. In Network Tab of DevTools, set Throttling to **Offline** and click **Refresh API Data**. Verify `<ErrorMessage />` displays with the Retry button.
6. Switch back to **No Throttling** and click **Retry Fetch**. Verify the repositories reload successfully.

---

## 12. Viva / Demo Discussion Points
1. **Why must `fetch` be placed inside `useEffect`?** Calling `fetch()` directly in the component body causes it to run on every render. Because updating state triggers a re-render, this causes an infinite render loop. `useEffect` with an empty dependency array `[]` ensures the request runs only once on component mount.
2. **Why handle loading and error states separately?** A network request has three distinct phases: pending, resolved, and rejected. Handling each phase explicitly prevents undefined variable crashes and provides unambiguous UI feedback to the user.
3. **What is unauthenticated rate-limiting on GitHub API?** GitHub permits 60 unauthenticated requests per hour per IP address. When exceeded, it returns HTTP 403 Forbidden. Practical 3 incorporates graceful fallback data so the demo never fails.
4. **Scope Isolation:** Practical 3 contains client-side React and external REST API consumption—no local Express server or MongoDB yet.
