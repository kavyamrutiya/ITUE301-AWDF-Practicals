# Practical 12: CI/CD Pipeline with GitHub Actions

[![CI Pipeline](https://github.com/kavyamrutiya/ITUE301-AWDF-Practicals/actions/workflows/ci.yml/badge.svg)](https://github.com/kavyamrutiya/ITUE301-AWDF-Practicals/actions/workflows/ci.yml)

## 1. Practical Metadata
- **Practical Number:** 12
- **Title:** CI/CD Pipeline with GitHub Actions and Automated Testing
- **Course Code:** ITUE301 - Advanced Web Development Frameworks
- **Department:** Computer Engineering, Faculty of Technology and Engineering (FTE)
- **Institution:** Charotar University of Science and Technology (CHARUSAT)
- **Student Name:** Kavy Amrutiya
- **Authoritative Curriculum Reference:** `2026-27-ODD-ITUE301-AWF-PracticalList.pdf`
- **Course Outcomes & Program Outcomes:** CO5 / PO3, PO5

---

## 2. Objective
To automate testing and validation of the full-stack Task Management application using a Continuous Integration (CI) pipeline powered by GitHub Actions. This practical automates code checkout, runtime provisioning, dependency installation, static code analysis (ESLint), and integration testing (Jest + Supertest) on every push and pull request targeting the `main` branch, demonstrating both failed and passing build workflows.

---

## 3. Technologies Used
- **CI/CD Automation Engine:** GitHub Actions (`actions/checkout@v4`, `actions/setup-node@v4`)
- **Automated Testing Framework:** Jest (`^29.7.0`)
- **HTTP Integration Testing:** Supertest (`^7.0.0`)
- **Static Code Analysis:** ESLint (`^8.57.0`)
- **Runtime Environment:** Node.js (v18+ LTS, Ubuntu Runner)
- **Database Service:** MongoDB 6.0 Service Container (`mongo:6.0`)
- **Application Stack:** Inherited from Practical 11 (React 18 SPA + Express API + Mongoose + JWT Auth + Node-Cache + EventEmitter + Docker Compose)

---

## 4. Architecture & CI/CD Pipeline Workflow

```text
                             [ Developer Git Push ]
                                       │
                                       ▼ (git push origin main)
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                       GitHub Actions CI Pipeline                            │
  │                      (.github/workflows/ci.yml)                             │
  │                                                                             │
  │   ┌─────────────────────────────────────────────────────────────────────┐   │
  │   │ Job 1: lint (Static Code Analysis)                                  │   │
  │   │ ├── 1. Checkout Repository (actions/checkout@v4)                    │   │
  │   │ ├── 2. Setup Node.js 18 (actions/setup-node@v4)                     │   │
  │   │ ├── 3. npm install (backend dependencies)                           │   │
  │   │ └── 4. npm run lint (ESLint code quality verification)              │   │
  │   └──────────────────────────────────┬──────────────────────────────────┘   │
  │                                      │                                      │
  │                                      ▼ (needs: lint - passes)               │
  │   ┌─────────────────────────────────────────────────────────────────────┐   │
  │   │ Job 2: build-and-test (Integration & Automated Testing)             │   │
  │   │ ├── Service: MongoDB 6.0 Container (Port 27017:27017)               │   │
  │   │ ├── 1. Checkout Repository                                          │   │
  │   │ ├── 2. Setup Node.js 18 + Dependency Cache                          │   │
  │   │ ├── 3. npm install                                                  │   │
  │   │ ├── 4. npm test (Jest + Supertest: GET /tasks, GET /, validation)   │   │
  │   │ └── 5. Evaluate Exit Code & Output Status                           │   │
  │   └──────────────────────────────────┬──────────────────────────────────┘   │
  │                                      │                                      │
  └──────────────────────────────────────┼──────────────────────────────────────┘
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 ▼                                               ▼
         [ If any test fails ]                          [ All tests pass ]
                 │                                               │
                 ▼                                               ▼
     ❌ Red X / Pipeline Failed                     ✅ Green Checkmark / Pass
     - Exit code: 1                                  - Exit code: 0
     - Deployment aborted                            - Pull Request mergeable
     - Logs highlight assertion mismatch             - Deployment allowed
```

---

## 5. Directory Structure
```text
Practical_12_CI_CD_Pipeline/
├── .github/
│   └── workflows/
│       └── ci.yml                      # GitHub Actions CI workflow definition
├── backend/
│   ├── .eslintrc.json                  # ESLint configuration for CI linting job
│   ├── .env.example                    # Environment variable template
│   ├── .gitignore                      # Excludes node_modules and .env
│   ├── Dockerfile                      # Production container image
│   ├── package.json                    # Contains test, test:broken, and lint scripts
│   ├── server.js                       # Express application entry point
│   ├── config/
│   │   ├── cache.js                    # In-memory caching engine (node-cache)
│   │   └── db.js                       # MongoDB connection with CI timeout fallback
│   ├── controllers/
│   │   ├── authController.js           # JWT authentication controller
│   │   └── taskController.js           # Task CRUD operations
│   ├── events/
│   │   ├── taskEvents.js               # Native EventEmitter instance
│   │   └── taskListeners.js            # Non-blocking async listeners
│   ├── middleware/
│   │   ├── auth.js                     # JWT authorization guard
│   │   ├── errorHandler.js             # Global centralized error handler
│   │   ├── logger.js                   # Request logging middleware
│   │   ├── notFound.js                 # 404 catch-all middleware
│   │   └── validateContentType.js      # 415 application/json validator
│   ├── models/
│   │   ├── Task.js                     # Mongoose Task schema
│   │   └── User.js                     # Mongoose User schema
│   └── tests/
│       ├── api.test.js                 # Passing test suite (7/7 tests pass)
│       └── broken.test.js              # Deliberate failure demo suite
├── frontend/                           # React 18 SPA (inherited from Practical 11)
├── docker-compose.yml                  # 3-service container orchestration
├── docs/
│   ├── failed-pipeline-demo.md         # Detailed logs of deliberate pipeline failure
│   └── fixed-pipeline-demo.md          # Detailed logs of corrected pipeline success
├── verification.md                     # Rubric verification checklist (20/20 marks)
└── README.md                           # Practical documentation
```

---

## 6. Implementation Steps (Lab Session Guide)

### Step 1: Install Testing and Linting Tools
In the backend directory, install Jest, Supertest, and ESLint as development dependencies:
```bash
cd Practical_12_CI_CD_Pipeline/backend
npm install --save-dev jest supertest eslint
```

### Step 2: Configure Test Scripts in `package.json`
Add the following scripts to `package.json`:
```json
"scripts": {
  "start": "node server.js",
  "test": "jest --runInBand --detectOpenHandles --forceExit",
  "test:broken": "jest tests/broken.test.js --testPathIgnorePatterns '/node_modules/' --runInBand --detectOpenHandles --forceExit",
  "lint": "eslint . --ext .js --ignore-pattern node_modules/"
}
```

### Step 3: Implement Automated Integration Tests (`tests/api.test.js`)
As mandated by the curriculum, write tests verifying HTTP endpoints:
```javascript
const request = require('supertest');
const app = require('../server');

test('GET /tasks returns 200', async () => {
  const res = await request(app).get('/tasks');
  expect(res.statusCode).toBe(200);
});
```

### Step 4: Create GitHub Actions Workflow (`.github/workflows/ci.yml`)
Define the pipeline trigger on `push` and `pull_request` targeting `main`:
```yaml
name: CI Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm install
        working-directory: Practical_12_CI_CD_Pipeline/backend
      - run: npm run lint
        working-directory: Practical_12_CI_CD_Pipeline/backend

  build-and-test:
    needs: lint
    runs-on: ubuntu-latest
    services:
      mongodb:
        image: mongo:6.0
        ports:
          - 27017:27017
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm install
        working-directory: Practical_12_CI_CD_Pipeline/backend
      - run: npm test
        working-directory: Practical_12_CI_CD_Pipeline/backend
```

### Step 5: Deliberate Failure Demonstration
1. Execute `npm run test:broken` or commit an assertion expecting status `999`.
2. Observe the Red X ❌ in the GitHub Actions tab.
3. Review logs pinpointing `Expected: 999, Received: 200`.
4. Detailed output recorded in [`docs/failed-pipeline-demo.md`](docs/failed-pipeline-demo.md).

### Step 6: Fix and Passing Pipeline Verification
1. Revert/correct the assertion to `expect(res.statusCode).toBe(200)`.
2. Re-run `npm test` locally and push to GitHub.
3. Observe all 7 tests passing and the pipeline turning Green ✅.
4. Detailed output recorded in [`docs/fixed-pipeline-demo.md`](docs/fixed-pipeline-demo.md).

---

## 7. How to Run and Test Locally

### 1. Run Automated Test Suite (Passing):
```bash
cd Practical_12_CI_CD_Pipeline/backend
npm test
```
*Expected Result:* `PASS tests/api.test.js` (7 passed, 7 total) in ~0.5s.

### 2. Run Deliberate Failure Demonstration:
```bash
cd Practical_12_CI_CD_Pipeline/backend
npm run test:broken
```
*Expected Result:* `FAIL tests/broken.test.js` (Expected: 999, Received: 200, Exit code: 1).

### 3. Run Static Code Analysis (ESLint):
```bash
cd Practical_12_CI_CD_Pipeline/backend
npm run lint
```
*Expected Result:* 0 errors, 0 warnings.

### 4. Run from Repository Root:
```bash
npm test                 # Runs Practical 12 passing test suite
npm run test:p12:broken  # Runs deliberate failure demonstration
npm run lint             # Runs ESLint check
```

---

## 8. Supplementary Problems Solutions

| Supplementary Requirement | Implementation Detail | Location |
| :--- | :--- | :--- |
| **1. Dedicated Linter Job** | Added `lint` job running ESLint before the test job. If linting fails, testing does not execute. | `.github/workflows/ci.yml` (Job: `lint`) |
| **2. Pull Request Trigger** | Configured `on: pull_request: branches: [main]` so tests run automatically on proposed PR merges. | `.github/workflows/ci.yml` (Lines 11-13) |
| **3. CI Status Badge** | Dynamic SVG status badge embedded at the top of this README and the master README. | Line 3 of this document & root `README.md` |

---

## 9. Viva / Key Analysis Questions & Answers

### Q1: What is the difference between Continuous Integration and Continuous Deployment, and which one does this practical actually demonstrate?
**Answer:**
- **Continuous Integration (CI):** The practice of frequently merging developer code into a shared repository, where every commit triggers automated builds and tests to detect regressions immediately.
- **Continuous Deployment (CD):** The automated pipeline extension where every validated build that passes all tests is automatically released into a production or staging hosting environment without manual human intervention.
- **What this practical demonstrates:** This practical demonstrates **Continuous Integration (CI)**. It automatically triggers on push, provisions an environment, installs dependencies, runs static analysis, and executes automated tests to report pass/fail status. It does not perform automatic hosting deployment to cloud infrastructure.

---

### Q2: Why does running tests automatically on every push catch problems earlier than testing manually before a release?
**Answer:**
1. **Immediate Context Isolation:** If a bug is caught on a specific push, the developer only modified a small delta of code within the last hour. The mental context is fresh, and identifying the faulty lines takes seconds.
2. **Preventing Error Cascades:** Manual testing before release batches weeks of changes together. If three separate developers introduced conflicting bugs, diagnosing which change broke which component becomes exponentially harder (n-factorial debugging complexity).
3. **Shift-Left Security and Quality:** Automated CI "shifts testing left" in the lifecycle, making testing a continuous validation gate rather than an eleventh-hour bottleneck.

---

### Q3: What would happen to the pipeline if the test file path were incorrect — would the workflow fail at the same step as a genuine test failure?
**Answer:**
- If the test file path is incorrect, the pipeline **fails at the same step** (`npm test`), but with a fundamentally different error mechanism:
  - **Genuine Test Failure:** Jest successfully loads the test file, executes the test code, and encounters an assertion mismatch (`Expected: 200, Received: 500`), exiting with code 1.
  - **Incorrect File Path:** Jest exits with code 1 due to `No tests found matching pattern <path>` (unless `--passWithNoTests` is erroneously used, in which case it falsely passes with 0 tests run, creating a dangerous silent failure).
- **CI Best Practice:** Always check the test summary count in the logs (`Tests: 7 passed, 7 total`) to ensure tests actually executed rather than being silently bypassed.

---

## 10. Troubleshooting Reference Table

| Symptom | Likely Cause | Resolution |
| :--- | :--- | :--- |
| **Workflow does not appear under GitHub Actions tab** | YAML file not located in `.github/workflows/` or filename does not end in `.yml` / `.yaml` | Ensure path is exactly `.github/workflows/ci.yml` and commit is pushed to GitHub. |
| **Workflow fails immediately with YAML syntax error** | Incorrect YAML indentation (e.g. mixing tabs and spaces) | Use strict 2-space indentation and validate syntax with a YAML linter. |
| **`npm test` fails with `no test specified`** | `package.json` missing `"test": "jest ..."` script | Add the test script to `backend/package.json` under `"scripts"`. |
| **Pipeline passes even with a broken test** | Assertion logic is trivial or unassertive (e.g., `expect(true).toBe(true)`) | Write assertions against dynamic server responses (e.g., `expect(res.statusCode).toBe(200)`). |
| **Test hangs indefinitely waiting for MongoDB** | Mongoose connection lacks responsive server selection timeout | Set `serverSelectionTimeoutMS: 1500` in `config/db.js` for test environments. |

---

## 11. Rubric Evaluation Checklist Mapping
- [x] **Workflow File (4 Marks):** `.github/workflows/ci.yml` properly created, valid syntax, push/PR triggers.
- [x] **Dependency Install Step (3 Marks):** Explicit `npm install` step in pipeline.
- [x] **Automated Test Step (5 Marks):** `GET /tasks returns 200` + 6 integration tests executed.
- [x] **Failed Pipeline Demo (4 Marks):** Deliberate broken test demonstrated, logs and Red X documented.
- [x] **Fixed Pipeline Demo (4 Marks):** Corrected assertions producing green checkmark documented.
- **Total:** 20 / 20 Marks (100% Passing Threshold: 14 / 20).
