# Tasks: Google Login & Per-User Redirection

**Input**: Design documents from `/specs/001-google-login-impl/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/api.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic backend container structure

- [ ] T001 Create `backend/` directory and initialize `package.json`
- [ ] T002 Install dependencies (`express`, `mongoose`, `google-auth-library`, `jsonwebtoken`, `cors`, `dotenv`)
- [ ] T003 Setup environment configuration (`backend/.env`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [ ] T004 Setup MongoDB connection in `backend/src/db.js`
- [ ] T005 Create `User` model in `backend/src/models/User.js`
- [ ] T006 Setup Express server and middleware structure in `backend/src/server.js` 
- [ ] T007 Create database seeding script for initial users in `backend/scripts/seed.js`

---

## Phase 3: User Story 5 - Baseline Security Protections (Priority: P1)

**Goal**: Minimum security to prevent trivial exploitation

### Implementation for User Story 5

- [ ] T008 [P] [US5] Implement XSS sanitization in `backend/src/middleware/sanitize.js`
- [ ] T009 [P] [US5] Add `type="password"` and basic HTML sanitation to `index.html` login fields
- [ ] T010 [US5] Add basic login attempt throttling simulated in backend memory (`authController.js`)

---

## Phase 4: User Story 1 - One-Tap Google Login (Priority: P1) 🎯 MVP

**Goal**: Log in with a single click using a Google account

### Implementation for User Story 1

- [ ] T011 [P] [US1] Insert Google Identity SDK `<script>` inside `index.html`
- [ ] T012 [P] [US1] Create the GIS login button element in `index.html` GUI
- [ ] T013 [US1] Parse Google response and forward JWT to backend
- [ ] T014 [US1] Create `POST /api/auth/google` endpoint in `backend/src/routes/authRoutes.js`
- [ ] T015 [US1] Verify Google token via `google-auth-library` and issue Session JWT in `backend/src/controllers/authController.js`

---

## Phase 5: User Story 2 - Traditional Email Login (Priority: P2)

**Goal**: Login using email and password fallback

### Implementation for User Story 2

- [ ] T016 [P] [US2] Update `index.html` form layout to intercept submit cleanly
- [ ] T017 [US2] Create `POST /api/auth/login` endpoint in `backend/src/routes/authRoutes.js`
- [ ] T018 [US2] Implement credential validation against MongoDB in `backend/src/controllers/authController.js`

---

## Phase 6: User Story 3 & 4 - Page Protection & Dynamic Redirection (Priority: P2/P3)

**Goal**: Inject specific IPs dynamically and block unauthenticated access. 

### Implementation for User Stories 3 & 4

- [ ] T019 [US3] Ensure token + Server IP are saved into `sessionStorage` upon success returning to `index.html`
- [ ] T020 [US3] Redirect valid users to `dashboard.html`
- [ ] T021 [US3] Add token presence check code injected at the start of `dashboard.html` (Redirecting back if missing)
- [ ] T022 [US3] Add token presence check code injected at the start of `historico.html`
- [ ] T023 [US4] Modify fetch loops in `dashboard.html` to consume `sessionStorage.serverIp` for the `baseURL` variable
- [ ] T024 [US4] Modify fetch loops in `historico.html` to consume `sessionStorage.serverIp` (if present)

---

## Dependencies & Execution Order

- **Foundational (Phase 2)**: Depends on Setup (Phase 1).
- **User Story 5 (P1)**: Depends on Phase 2.
- **User Story 1 (P1)**: Depends on Phase 2.
- **User Story 2 (P2)**: Integrates after MVP or alongside Phase 4.
- **User Story 3/4**: Finishing touches on frontend after Backend issues JWT.
