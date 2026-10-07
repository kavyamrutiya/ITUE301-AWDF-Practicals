# Practical 2: State Management and Routing in React

## 1. Practical Title
**Practical 2: State Management and Routing in React**  
**Subject:** Advanced Web Development Frameworks (ITUE301)  
**Semester:** 5th Semester, Computer Engineering  
**Institution:** Charotar University of Science and Technology (CHARUSAT), FTE  

---

## 2. Objective
To implement reactive state management using the `useState` hook and client-side multi-page navigation using React Router v6 in the portfolio application constructed in Practical 1, eliminating full page reloads.

---

## 3. Technologies Used
- **Runtime:** Node.js (v18+), npm
- **Build Tool:** Vite 5+
- **Frontend Framework:** React 18+ (`useState`, `useEffect`)
- **Routing:** React Router v6 (`react-router-dom`)
- **Styling:** Vanilla CSS with Light/Dark CSS Theme tokens

---

## 4. Folder Structure
```
Practical_02_Routing_State/
├── frontend/
│   ├── index.html
│   ├── package.json             # Added react-router-dom dependency
│   ├── vite.config.js
│   ├── public/
│   └── src/
│       ├── main.jsx             # Wraps <App /> with <BrowserRouter>
│       ├── App.jsx              # Defines <Routes>, <Route>, and isDark state
│       ├── index.css            # Light/Dark tokens & form/modal styles
│       ├── components/          # Reusable components
│       │   ├── NavBar.jsx       # Navigation bar with NavLink & theme toggle
│       │   ├── Header.jsx       # Inherited from Practical 1
│       │   ├── About.jsx        # Inherited from Practical 1
│       │   ├── Skills.jsx       # Inherited from Practical 1
│       │   └── Footer.jsx       # Inherited from Practical 1
│       └── pages/               # Route components
│           ├── Home.jsx         # Renders Header, About, Skills
│           ├── Projects.jsx     # Project cards with modal detail toggle
│           ├── Contact.jsx      # Controlled input form with char counter
│           └── NotFound.jsx     # 404 Catch-all route
├── verification.md              # Rubric checklist
└── README.md                    # Practical documentation
```

---

## 5. Installation Steps
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

---

## 6. Run Commands
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser at:
   ```
   http://localhost:5173
   ```
3. To test the build:
   ```bash
   npm run build
   ```

---

## 7. API Endpoints
*Not applicable for Practical 2.* (External REST API integration begins in Practical 3).

---

## 8. MongoDB Setup
*Not applicable for Practical 2.* (Database integration begins in Practical 5).

---

## 9. Docker Commands
*Not applicable for Practical 2.* (Containerization begins in Practical 11).

---

## 10. What Was Implemented
1. **Inherited Practical 1 Base:** Maintained Header, About, Skills, and Footer components without breaking changes.
2. **React Router v6 Integration:** Wrapped application in `BrowserRouter` in `main.jsx`. Configured 4 routes:
   - `/` &rarr; `Home.jsx`
   - `/projects` &rarr; `Projects.jsx`
   - `/contact` &rarr; `Contact.jsx`
   - `*` &rarr; `NotFound.jsx` (404 Fallback)
3. **SPA Navigation (No Full Reload):** Implemented `NavBar` using `<NavLink>` to highlight the active route visually.
4. **Controlled Form Inputs (`useState`):**
   - Built Contact form with controlled inputs (`value` and `onChange`).
   - Added live character countdown counter (`maxLength={250}`).
   - Added real-time message preview box updating synchronously on typing.
5. **Theme State Management (`useState`):**
   - Added `isDark` toggle button in NavBar.
   - Synchronized CSS tokens between dark and light themes dynamically.
6. **UI Visibility Toggle (`useState`):**
   - Added modal details toggle in `Projects.jsx` demonstrating state-driven modal display.

---

## 11. Testing Instructions
1. Run `npm run dev` and navigate to `http://localhost:5173`.
2. Click between **Home**, **Projects**, and **Contact** links. Observe URL changes without any full page reload.
3. On the **Contact** page, type into the message textarea. Verify the character counter increases and the live preview updates on each keystroke.
4. Click the **☀️ Light / 🌙 Dark** button in the navbar. Verify the entire application switches themes immediately.
5. In the address bar, type `http://localhost:5173/unknown-path`. Verify the custom 404 `NotFound` component renders with a link back to Home.

---

## 12. Viva / Demo Discussion Points
1. **How does client-side routing work under the hood?** React Router intercepts browser navigation events via the HTML5 History API (`pushState` / `popState`), updating the rendered component without initiating a fresh HTTP request to the server.
2. **What makes an input 'Controlled'?** A form input whose value is governed by React state (`value={state}`) and updated through an event handler (`onChange={e => setState(...)}`) is controlled. This gives React complete authority over the input lifecycle.
3. **Why must `BrowserRouter` wrap the application only once?** Placing multiple routers causes context conflicts and desynchronization with browser history.
4. **Scope Isolation:** Practical 2 contains routing and local state only—no backend API, no database, no caching.
