# Practical 8: Performance Optimization and Lazy Loading in React

## 1. Practical Title
**Practical 8: Performance Optimization and Lazy Loading in React**  
**Subject:** Advanced Web Development Frameworks (ITUE301)  
**Semester:** 5th Semester, Computer Engineering  
**Institution:** Charotar University of Science and Technology (CHARUSAT), FTE  

---

## 2. Objective
To optimize the frontend of the full-stack application by implementing route-level code splitting using `React.lazy()` and `Suspense`, measure the reduction in initial JavaScript bundle size, inspect dynamic chunk requests in browser Network DevTools, and document empirical before/after build comparisons.

---

## 3. Technologies Used
- **Frontend Framework:** React 18+ (`React.lazy()`, `<Suspense>`)
- **Bundler:** Vite 5+ (Rollup code-splitting engine)
- **DevTools:** Browser Network Panel (Chunk waterfall & simulated Slow 3G throttling)
- **Backend:** Express & MongoDB from Practical 7

---

## 4. Folder Structure
```
Practical_08_Lazy_Loading/
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx              # React.lazy() dynamic imports + Suspense fallback
│       ├── api/api.js           # Full-stack API integration
│       └── pages/
│           ├── Home.jsx         # Default exported lazy page
│           ├── Tasks.jsx        # Default exported lazy page
│           ├── Contact.jsx      # Default exported lazy page
│           └── NotFound.jsx     # Default exported lazy page
├── backend/                     # Full Express & MongoDB backend (P7 base)
│   ├── package.json
│   ├── server.js
│   └── ...
├── docs/
│   └── performance-report.md    # Real measured bundle & code-splitting benchmarks
├── verification.md              # Rubric checklist
└── README.md                    # Practical documentation
```

---

## 5. Installation Steps
1. **Frontend:**
   ```bash
   cd frontend
   npm install
   ```
2. **Backend:**
   ```bash
   cd ../backend
   npm install
   ```

---

## 6. Run Commands
1. Start the backend:
   ```bash
   cd backend && npm start
   ```
2. Start the frontend development server:
   ```bash
   cd frontend && npm run dev
   ```
3. Generate production build with code splitting:
   ```bash
   cd frontend && npm run build
   ```

---

## 7. API Endpoints
All task and authentication routes from Practical 7 remain fully operational and integrated with the lazy-loaded `Tasks` page.

---

## 8. MongoDB Setup
Uses the Practical 7 database configuration (`taskdb_practical7` or `taskdb_practical8`).

---

## 9. Docker Commands
*Not applicable for Practical 8.* (Docker is Practical 11).

---

## 10. What Was Implemented
1. **Route-Level Code Splitting:** Converted static page imports in `App.jsx` to dynamic `React.lazy(() => import('./pages/...'))` imports.
2. **Suspense Wrapper:** Wrapped the `<Routes>` tree inside `<Suspense fallback={<RouteFallback />}>`.
3. **Meaningful Fallback UI:** Provided an animated route-transition spinner indicating dynamic chunk retrieval.
4. **Independent Chunks:** Build tool generates distinct chunks:
   - Initial entry bundle (`index-*.js`)
   - On-demand route chunks: `Home-*.js`, `Tasks-*.js`, `Contact-*.js`, `NotFound-*.js`
5. **Real Performance Metrics Documentation:** Compiled build size measurements into `docs/performance-report.md`.

---

## 11. Testing & Verification Instructions
1. Run `npm run build` in `frontend/` and inspect terminal output.
2. Confirm Vite outputs separate chunk files for `Home`, `Tasks`, `Contact`, and `NotFound`.
3. Open `http://localhost:5173` with DevTools &rarr; Network Tab open.
4. Filter by **JS**. Notice only the entry chunk and `Home` chunk load initially.
5. Click **Tasks (Protected)** in the navbar. Observe a new dynamic chunk (`Tasks-*.js`) being fetched in real time.
6. Throttle connection to **Slow 3G** in Network Tab. Click **Contact** &rarr; verify the `<RouteFallback />` spinner renders gracefully while the chunk downloads.

---

## 12. Viva / Demo Discussion Points
1. **Why does `React.lazy` require default exports?** `React.lazy()` expects a Promise resolving to a module with a `.default` property containing a React component (`{ default: Component }`). Named exports require an intermediate wrapper.
2. **How does code splitting improve First Contentful Paint (FCP)?** By extracting routes that the user may not immediately visit out of the main bundle, the initial JavaScript file transferred over the network is smaller. Browsers download, parse, and execute less code upfront, drastically reducing FCP and Time to Interactive (TTI).
3. **What is the purpose of `<Suspense>`?** Suspense acts as a declarative boundary that intercepts unresolved Promises from lazy components and displays a fallback UI until the code chunk arrives.
