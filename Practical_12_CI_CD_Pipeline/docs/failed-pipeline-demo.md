# Practical 12: Deliberately Broken Test & Failed Pipeline Demonstration

**Course:** ITUE301 - Advanced Web Development Frameworks  
**Authoritative Curriculum Reference:** `2026-27-ODD-ITUE301-AWF-PracticalList.pdf`  
**Evaluation Rubric:** Failed Pipeline Demo (4 Marks)  
**Student:** Kavy Amrutiya  

---

## 1. Objective of Failure Demonstration
As mandated by the ITUE301 curriculum, the core learning objective of CI/CD is not just observing passing builds, but understanding how the automated pipeline detects regression faults, fails fast, halts deployment, and surfaces diagnostic logs before flawed code reaches staging or production.

```text
Developer Git Push (with broken assertion)
                 │
                 ▼
     GitHub Actions Runner
                 │
                 ▼
       Step 1: Checkout Code  ──────► [✓ Success]
                 │
                 ▼
     Step 2: Setup Node.js 18 ──────► [✓ Success]
                 │
                 ▼
     Step 3: npm install      ──────► [✓ Success]
                 │
                 ▼
     Step 4: npm test         ──────► [❌ FAILED - Exit Code 1]
                                              │
                                              ▼
                             Pipeline Terminated with Red X ❌
                             Deployment Blocked
```

---

## 2. Deliberate Fault Injection Code

The test in `tests/broken.test.js` deliberately alters the expected HTTP status code of the root health check endpoint from `200 OK` to `999` and `/tasks` to `404`:

```javascript
// File: tests/broken.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

describe('Practical 12: Deliberately Broken Test (Failure Demonstration)', () => {

  afterAll(async () => {
    try {
      if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
      }
    } catch (err) {
      // Clean teardown
    }
  });

  test('GET / returns 999 (DELIBERATE FAILURE ASSERTION)', async () => {
    const res = await request(app).get('/');

    // INTENTIONAL MISMATCH: The server legitimately returns 200 OK.
    // Changing expected to 999 triggers Jest assertion failure and exits with code 1.
    expect(res.statusCode).toBe(999);
  });

  test('GET /tasks returns 404 (DELIBERATE SECOND FAILURE)', async () => {
    const res = await request(app).get('/tasks');

    // INTENTIONAL MISMATCH: GET /tasks returns 200, but test asserts 404
    expect(res.statusCode).toBe(404);
  });

});
```

---

## 3. Command to Trigger Failure Locally & In CI

Run the broken test script configured in `package.json`:

```bash
cd Practical_12_CI_CD_Pipeline/backend
npm run test:broken
```

Or from the workspace root:

```bash
npm run test:p12:broken
```

---

## 4. Exact Captured Pipeline Failure Logs

The following raw log output was generated during execution, demonstrating the pipeline failure:

```text
> practical-12-cicd-pipeline@1.0.0 test:broken
> jest tests/broken.test.js --testPathIgnorePatterns '/node_modules/' --runInBand --detectOpenHandles --forceExit

  console.log
    [EVENTS] Dedicated Task Event Listeners registered successfully.
      at Object.log (events/taskListeners.js:37:9)

  console.log
    [DATABASE] MongoDB Connected: 127.0.0.1/taskdb_practical12
      at log (config/db.js:19:13)

  console.log
    [LOG] GET / - 2026-10-21T17:44:36.896Z
      at log (middleware/logger.js:7:11)

  console.log
    [LOG] GET /tasks - 2026-10-21T17:44:36.911Z
      at log (middleware/logger.js:7:11)

FAIL tests/broken.test.js
  Practical 12: Deliberately Broken Test (Failure Demonstration)
    ✕ GET / returns 999 (DELIBERATE FAILURE ASSERTION) (23 ms)
    ✕ GET /tasks returns 404 (DELIBERATE SECOND FAILURE) (30 ms)

  ● Practical 12: Deliberately Broken Test (Failure Demonstration) › GET / returns 999 (DELIBERATE FAILURE ASSERTION)

    expect(received).toBe(expected) // Object.is equality

    Expected: 999
    Received: 200

      23 |     // INTENTIONAL MISMATCH: The server legitimately returns 200 OK.
      24 |     // Changing expected to 999 triggers Jest assertion failure and exits with code 1.
    > 25 |     expect(res.statusCode).toBe(999);
         |                            ^
      26 |   });
      27 |
      28 |   test('GET /tasks returns 404 (DELIBERATE SECOND FAILURE)', async () => {

      at Object.toBe (tests/broken.test.js:25:28)

  ● Practical 12: Deliberately Broken Test (Failure Demonstration) › GET /tasks returns 404 (DELIBERATE SECOND FAILURE)

    expect(received).toBe(expected) // Object.is equality

    Expected: 404
    Received: 200

      30 |
      31 |     // INTENTIONAL MISMATCH: GET /tasks returns 200, but test asserts 404
    > 32 |     expect(res.statusCode).toBe(404);
         |                            ^
      33 |   });
      34 |
      35 | });

      at Object.toBe (tests/broken.test.js:32:28)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
Snapshots:   0 total
Time:        0.456 s
Ran all test suites matching /tests\/broken.test.js/i.
npm error Lifecycle script `test:broken` failed with error:
npm error code 1
```

---

## 5. Visual Pipeline Status Representation

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│  GitHub Actions / Workflows / CI Pipeline                                   │
│  Commit: feat: demonstrate deliberate failure assertion in test suite        │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ❌ build-and-test   (Duration: 42s)                                         │
│                                                                              │
│     ├── 🟢 Set up job                              (2s)                     │
│     ├── 🟢 Checkout code                           (1s)                     │
│     ├── 🟢 Set up Node.js 18                       (3s)                     │
│     ├── 🟢 Install Backend Dependencies            (18s)                    │
│     └── 🔴 Run Automated Tests (npm test)          (4s)                     │
│            │                                                                │
│            └── FAIL tests/broken.test.js                                    │
│                ● Expected: 999, Received: 200                               │
│                Error: Process completed with exit code 1.                   │
│                                                                              │
│  Conclusion: Workflow run FAILED (Red X). Build rejected.                   │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Diagnostic Takeaways
1. **Zero Silent Failures:** Jest returned non-zero exit code (`1`), which GitHub Actions immediately recognized as a critical task failure.
2. **Deterministic Root-Cause Analysis:** The failure log explicitly isolated the file (`tests/broken.test.js`), the line (`expect(res.statusCode).toBe(999)`), and the comparison (`Expected: 999, Received: 200`).
3. **Continuous Deployment Gate:** In an end-to-end CD workflow, this failure terminates the job before any deployment step can trigger, preserving production uptime.
