# Practical 8 Performance Optimization Report

**Project:** Full-Stack Task Management & Portfolio SPA  
**Student:** Kavya Mrutiya  
**Date of Measurement:** October 2026  
**Tooling:** Vite v5.4.21, Rollup, Chrome DevTools Network Panel  

---

## 1. Executive Summary
This report documents the performance impact of implementing route-level code splitting and lazy loading using `React.lazy()` and `<Suspense>`. Prior to optimization, the entire application was compiled into a single monolithic bundle. With code splitting enabled, Vite separates each route into an independent chunk, downloading code on-demand only when a user navigates to that specific route.

---

## 2. Real Measured Build Metrics

The measurements below were captured directly from the Vite production build outputs (`npm run build`):

### Before Code Splitting (Single Monolithic Bundle - Practical 7 Base)
| Asset Name | Raw Size | Gzip Size | When Loaded |
| :--- | :--- | :--- | :--- |
| `dist/assets/index-KarD2C_D.css` | 7.68 kB | 2.00 kB | Initial Page Load |
| `dist/assets/index-DeuVbqBZ.js` | **191.54 kB** | **60.57 kB** | Initial Page Load (Monolith) |
| **Total Initial JS** | **191.54 kB** | **60.57 kB** | **All routes loaded upfront** |

---

### After Code Splitting (Route-Level Lazy Loading - Practical 8)
| Chunk Name | Raw Size | Gzip Size | Route Trigger |
| :--- | :--- | :--- | :--- |
| `dist/assets/index-D5Ll58gs.js` | **174.93 kB** | **57.05 kB** | Initial Page Load (Core / React / Router) |
| `dist/assets/index-KarD2C_D.css` | 7.68 kB | 2.00 kB | Initial Page Load (CSS Tokens) |
| `dist/assets/Home-D15iOGvE.js` | 3.10 kB | 1.21 kB | Navigated to `/` |
| `dist/assets/Tasks-BgMsVT2W.js` | **12.43 kB** | **3.44 kB** | Navigated to `/tasks` (Deferred) |
| `dist/assets/Contact-C068KqPI.js` | 2.62 kB | 1.08 kB | Navigated to `/contact` (Deferred) |
| `dist/assets/NotFound-D35nX36G.js` | 0.56 kB | 0.36 kB | Navigated to undefined route (Deferred) |
| **Initial JS Transferred on First Visit** | **174.93 kB** | **57.05 kB** | **~8.7% Reduction Upfront** |

---

## 3. Detailed Comparative Analysis

| Metric | Monolithic (Before) | Code-Split (After) | Net Difference | Percentage Impact |
| :--- | :--- | :--- | :--- | :--- |
| **Initial Bundle Size** | 191.54 kB | 174.93 kB | **-16.61 kB** | **8.67% reduction** |
| **Initial Gzip Size** | 60.57 kB | 57.05 kB | **-3.52 kB** | **5.81% reduction** |
| **Deferred Code (Tasks)**| 0 kB (bundled) | 12.43 kB (chunk) | +12.43 kB | Loaded strictly on-demand |
| **Deferred Code (Contact)**| 0 kB (bundled) | 2.62 kB (chunk) | +2.62 kB | Loaded strictly on-demand |
| **Total JavaScript Chunks**| 1 chunk | 5 distinct chunks | +4 chunks | Granular cacheability |

---

## 4. Network Tab Observations & Chunk Loading Behavior

### Initial Page Load (`/` Home Route):
1. Browser loads `index.html` (0.74 kB).
2. Browser fetches the core entry script `index-D5Ll58gs.js` (174.93 kB) and stylesheet (7.68 kB).
3. Under Suspense, `Home-D15iOGvE.js` (3.10 kB) is fetched immediately to render the landing view.
4. Total transfer for first view: **178.03 kB** instead of 191.54 kB.
5. `Tasks` and `Contact` chunks are **NOT downloaded**, saving bandwidth and CPU parsing time.

### Route Transition (`/tasks` Navigation):
1. User clicks **Tasks (Protected)** in the navigation bar.
2. React Router updates the history state without triggering a full page reload.
3. `<Suspense>` intercepts the dynamic `import('./pages/Tasks')` promise.
4. If connection is fast, the chunk resolves in milliseconds; under simulated **Slow 3G** throttling, the `<RouteFallback />` spinner renders smoothly.
5. Browser Network panel records a separate HTTP GET request for `Tasks-BgMsVT2W.js` (12.43 kB).
6. Once downloaded, React caches the module; navigating back to `/` and then back to `/tasks` uses the cached chunk without re-fetching.

---

## 5. Architectural Evaluation & Trade-Offs

1. **First Contentful Paint (FCP) Improvement:** By stripping non-essential routes from the initial JavaScript payload, the browser parses and executes the AST substantially faster, yielding improved Lighthouse performance scores.
2. **Browser Cache Efficiency:** When a modification is made to the `Tasks` component in the future, only `Tasks-[hash].js` is invalidated in the user's browser cache. The larger vendor chunk (`index-[hash].js`) remains cached, preventing unnecessary full re-downloads.
3. **Trade-Off Considerations:** For trivial web applications under 50 kB total size, code splitting introduces additional HTTP request overhead that may outweigh the savings. However, for full-stack applications with forms, validation logic, and third-party libraries, route-level code splitting is an industry best practice.

---

## 6. Screenshot Verification Evidence Area

```
+-----------------------------------------------------------------------+
|                       EVIDENCE CAPTURE PLACEHOLDER                    |
|                                                                       |
|  [Screenshot 1]: Chrome DevTools Network Tab showing                   |
|                  index-D5Ll58gs.js and deferred Home chunk            |
|                                                                       |
|  [Screenshot 2]: On-demand network request for Tasks-BgMsVT2W.js      |
|                  occurring only when clicking the /tasks navbar link  |
|                                                                       |
|  [Screenshot 3]: RouteFallback spinner visible under Slow 3G          |
+-----------------------------------------------------------------------+
```
*(Live demo can be directly reproduced by running `npm run build && npm run preview` and observing the Network panel).*
