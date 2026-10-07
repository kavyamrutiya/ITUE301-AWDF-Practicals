# Practical 2 Verification Checklist

**Title:** State Management and Routing in React  
**Course:** ITUE301 - Advanced Web Development Frameworks  
**Student:** Kavya Mrutiya  

| Status | Rubric Item | Implementation Detail |
| :---: | :--- | :--- |
| [✓] | **React Router v6 Setup** | `react-router-dom` installed, `BrowserRouter` wraps `App` in `main.jsx` |
| [✓] | **Minimum 3 Routes** | `/` (Home), `/projects` (Projects), `/contact` (Contact) configured |
| [✓] | **404 Catch-All Route** | `*` route renders custom `NotFound.jsx` with return navigation |
| [✓] | **No Page Reload** | Navigation implemented with `<NavLink>` and `<Link>` |
| [✓] | **Active Nav Highlighting** | Active link receives `.active` class with visual gradient badge |
| [✓] | **useState Controlled Input** | Contact form fields bound to state via `value` and `onChange` |
| [✓] | **Live State Update** | Message input includes live character counter and live message preview |
| [✓] | **Dark/Light Theme Toggle** | `useState(true)` controls `isDark`, updates body class and CSS tokens |
| [✓] | **Inheritance from P1** | Reuses Header, About, Skills, and Footer from Practical 1 |
| [✓] | **Scope Isolation** | No backend API, MongoDB, or Docker included |

**Verdict:** PASS (100% Rubric Compliance)
