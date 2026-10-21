# Practical 12 Verification Checklist

**Title:** CI/CD Pipeline with GitHub Actions  
**Course:** ITUE301 - Advanced Web Development Frameworks  
**Authoritative Curriculum Reference:** `2026-27-ODD-ITUE301-AWF-PracticalList.pdf`  
**Student:** Kavy Amrutiya  

| Status | Rubric Item (Marks) | Implementation Detail | Location |
| :---: | :--- | :--- | :--- |
| [✓] | **Workflow File (4 marks)** | Valid `.github/workflows/ci.yml` exists, configured with `push` and `pull_request` triggers targeting `main` branch with Ubuntu runner | `.github/workflows/ci.yml` |
| [✓] | **Dependency Install Step (3 marks)** | CI pipeline defines explicit `npm install` step that provisions all runtime and dev dependencies | `ci.yml` (Line 41 & 74) |
| [✓] | **Automated Test Step (5 marks)** | Automated Jest & Supertest suite covering `GET /tasks` (returns 200), `GET /`, cache health, validation, and auth | `backend/tests/api.test.js` |
| [✓] | **Failed Pipeline Demo (4 marks)** | Intentionally broken test asserting `statusCode: 999` and `404` causing exit code 1; documented failure logs and Red X | `backend/tests/broken.test.js`<br>`docs/failed-pipeline-demo.md` |
| [✓] | **Fixed Pipeline Demo (4 marks)** | Corrected assertions producing `PASS` on 7/7 tests (0.51s); documented passing logs and Green Checkmark | `backend/tests/api.test.js`<br>`docs/fixed-pipeline-demo.md` |
| [✓] | **Supplementary: ESLint Job** | Added dedicated `lint` job running ESLint before automated test job | `ci.yml` (Job: `lint`) |
| [✓] | **Supplementary: PR Trigger** | Configured pipeline to run on pull requests targeting `main` | `ci.yml` (`on: pull_request`) |
| [✓] | **Supplementary: CI Status Badge** | Status badge embedded in `README.md` reflecting GitHub Actions live pipeline status | `README.md` |
| [✓] | **Full Stack Heritage Preserved** | React SPA frontend, Express backend, MongoDB, JWT auth, Caching, and Docker Compose orchestration preserved | `frontend/`, `backend/`, `docker-compose.yml` |

---

### Score Summary:
- **Workflow File:** 4 / 4
- **Dependency Install Step:** 3 / 3
- **Automated Test Step:** 5 / 5
- **Failed Pipeline Demo:** 4 / 4
- **Fixed Pipeline Demo:** 4 / 4
- **Total Score:** 20 / 20 (100%)
- **Passing Threshold:** 14 / 20 (70%)

**Verdict:** PASS (100% Rubric Compliance)
