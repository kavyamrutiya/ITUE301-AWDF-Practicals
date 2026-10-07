# Practical 3 Verification Checklist

**Title:** API Integration and Data Rendering in React  
**Course:** ITUE301 - Advanced Web Development Frameworks  
**Student:** Kavya Mrutiya  

| Status | Rubric Item | Implementation Detail |
| :---: | :--- | :--- |
| [✓] | **API Call Implementation** | `fetch()` consumes GitHub REST API inside `useEffect()` on mount |
| [✓] | **Projects Integration Point** | `Projects.jsx` serves as the dynamic API consumption page |
| [✓] | **Loading State** | Dedicated `<Spinner />` component rendered while `loading === true` |
| [✓] | **Error Handling** | `<ErrorMessage />` rendered when `error !== null` without app crash |
| [✓] | **Retry Button** | Error component includes `onRetry={fetchRepositories}` button |
| [✓] | **Data Rendering** | Renders repository name, description, html_url, and star count |
| [✓] | **Search / Filter Input** | Live search filters repositories by name or language |
| [✓] | **Inheritance from P1 & P2** | Preserves all routes, NavBar, dark/light theme, and portfolio sections |
| [✓] | **Scope Isolation** | No local backend or MongoDB included |

**Verdict:** PASS (100% Rubric Compliance)
