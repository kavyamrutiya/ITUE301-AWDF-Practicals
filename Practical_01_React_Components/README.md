# Practical 1: Introduction to React and Component Architecture

## 1. Practical Title
**Practical 1: Introduction to React and Component Architecture**  
**Subject:** Advanced Web Development Frameworks (ITUE301)  
**Semester:** 5th Semester, Computer Engineering  
**Institution:** Charotar University of Science and Technology (CHARUSAT), FTE  

---

## 2. Objective
To set up a modern React development environment using Vite and construct a static, responsive student portfolio web application using independently structured, reusable functional components communicating via props.

---

## 3. Technologies Used
- **Runtime & Tooling:** Node.js (v18+), npm
- **Bundler & Build Tool:** Vite 5+
- **Frontend Framework:** React 18+ (Functional Components, JSX)
- **Styling:** Modular Vanilla CSS with CSS custom properties (variables) & Glassmorphism
- **Fonts:** Plus Jakarta Sans & JetBrains Mono

---

## 4. Folder Structure
```
Practical_01_React_Components/
├── frontend/
│   ├── index.html               # Single page HTML entry point
│   ├── package.json             # Project dependencies and Vite scripts
│   ├── vite.config.js           # Vite build configuration with React plugin
│   ├── public/                  # Static assets
│   └── src/
│       ├── main.jsx             # React DOM root render
│       ├── App.jsx              # Main root component composing all 4 sections
│       ├── index.css            # Global styling and component layout tokens
│       └── components/          # Dedicated folder for modular components
│           ├── Header.jsx       # Reusable Header receiving name/theme props
│           ├── About.jsx        # About component detailing academic background
│           ├── Skills.jsx       # Skills component receiving array props dynamically
│           └── Footer.jsx       # Reusable Footer with copyright & links
├── verification.md              # Rubric verification checklist
└── README.md                    # Comprehensive practical documentation
```

---

## 5. Installation Steps
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install project dependencies:
   ```bash
   npm install
   ```

---

## 6. Run Commands
1. Start the Vite local development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```
3. To build the production bundle:
   ```bash
   npm run build
   ```

---

## 7. API Endpoints
*Not applicable for Practical 1.* (Backend and external API consumption are introduced in Practical 3 and Practical 4).

---

## 8. MongoDB Setup
*Not applicable for Practical 1.* (Database integration is introduced in Practical 5).

---

## 9. Docker Commands
*Not applicable for Practical 1.* (Containerization is introduced in Practical 11).

---

## 10. What Was Implemented
1. **Vite Scaffolding:** Clean project setup configured with `@vitejs/plugin-react`.
2. **Component Architecture:** Built 4 isolated functional components inside `src/components/`:
   - `Header.jsx`: Displays student headline, title, and badge. Receives `name`, `role`, `tagline`, and `themeColor` via props.
   - `About.jsx`: Presents student academic context, department, and university credentials.
   - `Skills.jsx`: Accepts a `skillList` array via props and renders each skill as a styled pill tag using `.map()` with unique keys.
   - `Footer.jsx`: Accepts `year`, `studentName`, and social URLs via props.
3. **Props Communication:** Demonstrated data transfer from `App.jsx` to child components (`Header` and `Skills`) without hardcoding values in children.
4. **Independent Layout:** Single-page portfolio composed cleanly in `App.jsx` without code duplication.

---

## 11. Testing Instructions
1. Run `npm run dev` and confirm the server starts on `http://localhost:5173`.
2. Verify in the browser that all 4 components (Header, About, Skills, Footer) render visibly.
3. Open Developer Tools Console (F12) to verify zero runtime warnings, errors, or missing key warnings.
4. Change the props passed in `App.jsx` (e.g., change `name` or add an item to `studentSkills`) and observe immediate Hot Module Replacement (HMR) in the browser.

---

## 12. Viva / Demo Discussion Points
1. **Why Vite over Create React App (CRA)?** Vite leverages native ES Modules (ESM) in modern browsers and esbuild for pre-bundling dependencies, delivering near-instant server start and millisecond Hot Module Replacement (HMR).
2. **What are Props and why are they immutable?** Props (properties) allow parent components to pass data down the component hierarchy. Props are strictly read-only for child components to ensure predictable one-way data flow.
3. **Why do list items require a unique `key` prop?** React's virtual DOM reconciliation algorithm uses keys to track which items have changed, been added, or been removed, minimizing expensive real DOM updates.
4. **Scope Isolation:** Practical 1 contains strictly UI components and props—no React Router, no backend, and no database.
