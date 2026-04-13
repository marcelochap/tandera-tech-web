---
description: "Task list for Dynamic History Fetch implementation"
---

# Tasks: Dynamic History Fetch

**Input**: Design documents from `/specs/003-dynamic-history-fetch/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Manual visual testing (no automated tests requested).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story. Since all changes apply to a single Javascript scope inside `historico.html`, tasks cannot run in parallel.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Remove hardcoded `cameraID` variables and API urls inside `c:\Projetos Antigravity\Projeto webapp\Projeto Frontend Tandera\historico.html` to prepare for dynamic implementation.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T002 Implement URL parameter parsing logic (`new URLSearchParams(window.location.search)`) to extract `camera` and `name` variables in `c:\Projetos Antigravity\Projeto webapp\Projeto Frontend Tandera\historico.html`.
- [x] T003 Extract `tandera_serverIp` from `sessionStorage` alongside the Auth token checks in `c:\Projetos Antigravity\Projeto webapp\Projeto Frontend Tandera\historico.html`.

**Checkpoint**: Foundation ready - URL parsing and session data available. ✓

---

## Phase 3: User Story 1 & 2 - Navegação Direta via Dashboard / URL (Priority: P1/P2) 🎯 MVP

**Goal**: Load the correct camera data from the API endpoint based on URL parameters and update the UI accordingly.

**Independent Test**: Click any "Ver Histórico" button on the Dashboard and verify the page title and network request reflect that specific camera.

### Implementation for User Story 1 & 2

- [x] T004 [US1] Update `fetchData()` in `c:\Projetos Antigravity\Projeto webapp\Projeto Frontend Tandera\historico.html` to construct the API URL dynamically using `${userServerIp}/blocks/camera/${cameraID}/...` instead of fixed strings.
- [x] T005 [US1] Modify the DOM update logic in `c:\Projetos Antigravity\Projeto webapp\Projeto Frontend Tandera\historico.html` to inject the `name` parameter into the Header and Chart titles (e.g., `<h2 class="history-title">...</h2>`).
- [x] T006 [US1] Ensure date filters in `fetchData(startDate, endDate)` append correctly to the end of the new dynamic API URL.

**Checkpoint**: At this point, clicking from the dashboard or typing a URL with valid parameters will load specific machine data. ✓

---

## Phase 4: User Story 3 - Fallback para Câmera Padrão (Priority: P3)

**Goal**: Prevent empty/broken charts when users access the page without URL parameters.

**Independent Test**: Load `historico.html` with no query parameters. It should successfully load the first available camera from the session cache or safely redirect to the dashboard.

### Implementation for User Story 3

- [x] T007 [US3] Replicate the `xorCipherD` function natively inside `c:\Projetos Antigravity\Projeto webapp\Projeto Frontend Tandera\historico.html` to allow decryption of the `tandera_cameras` session object.
- [x] T008 [US3] Implement fallback logic where if `cameraID` from URL is null, it reads the 0-index object from the decrypted `tandera_cameras` list and assigns its `_id` and `name`.
- [x] T009 [US3] Implement a final error boundary: If `cameraID` is still null (both URL and Cache failed), alert the user and redirect to `dashboard.html`.

**Checkpoint**: All user stories should now be independently functional. ✓

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T010 Clean up any residual console logs and fix any linter formatting artifacts within `c:\Projetos Antigravity\Projeto webapp\Projeto Frontend Tandera\historico.html`.

---

## Dependencies & Execution Order

- **Foundational (Phase 2)**: Depends on Phase 1 cleanup.
- **US1 & US2 (Phase 3)**: Depends on Foundational parameter resolution.
- **US3 (Phase 4)**: Depends on US1/US2 to understand the DOM injection format.

### Parallel Opportunities

Due to the single-file nature of this project's architecture (`historico.html` monolithic JS structure), **Parallel Execution [P] is NOT recommended**. Tasks should run sequentially to prevent Git merge conflicts and AST parsing errors.
