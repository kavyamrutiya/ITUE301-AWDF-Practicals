# Practical 1 Verification Checklist

**Title:** Introduction to React and Component Architecture  
**Course:** ITUE301 - Advanced Web Development Frameworks  
**Student:** Kavya Mrutiya  

| Status | Rubric Item | Implementation Detail |
| :---: | :--- | :--- |
| [✓] | **Vite React Environment** | Scaffolding created using Vite with `@vitejs/plugin-react` |
| [✓] | **Component Folder Structure** | Dedicated `src/components/` directory housing all reusable components |
| [✓] | **Minimum 4 Components** | `Header.jsx`, `About.jsx`, `Skills.jsx`, `Footer.jsx` created and composed |
| [✓] | **Component Independence** | Each component in its own file; no duplicate JSX or logic |
| [✓] | **Props Implementation (>= 2 components)** | `Header` receives `name`, `role`, `tagline`, `themeColor`; `Skills` receives `skillList` array |
| [✓] | **Dynamic Array Rendering** | `Skills.jsx` renders `skillList.map((skill, index) => ...)` with key attributes |
| [✓] | **Clean App.jsx Composition** | `App.jsx` acts purely as layout root passing props down |
| [✓] | **Zero Console Errors** | No missing keys, no invalid JSX, no undefined prop errors |
| [✓] | **Scope Isolation** | No React Router, backend API, MongoDB, or Docker included |

**Verdict:** PASS (100% Rubric Compliance)
