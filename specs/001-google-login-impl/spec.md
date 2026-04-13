# Feature Specification: Google Login & Per-User Redirection

**Feature Branch**: `001-google-login-impl`  
**Created**: 2026-04-13  
**Status**: Draft  
**Input**: User description: "Use index.html as template to build a login screen with Google Login (primary) and Email/Password (secondary). Redirect users to dashboard.html/historico.html with different server IPs based on the logged-in user."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - One-Tap Google Login (Priority: P1)

As a returning user with a Google account, I want to log in with a single click so that I can quickly access my machine data.

**Why this priority**: High value for user experience, reduces friction, and follows the "Google-First Identity" principle.

**Independent Test**: User clicks the Google Login button. After selection, the browser redirects to `dashboard.html`. The console/storage shows a user-specific server IP is active.

**Acceptance Scenarios**:

1. **Given** the user is on `index.html`, **When** they click "Sign in with Google" and authenticate, **Then** they are redirected to `dashboard.html`.
2. **Given** a successful Google Login, **When** the `dashboard.html` loads, **Then** it fetches machine data from the IP mapped specifically to that user.

---

### User Story 2 - Traditional Email Login (Priority: P2)

As a user without a Google account, I want to use my email and password to log in so that I can still access the system.

**Why this priority**: Necessary fallback for security or corporate users who might not use Google Identity.

**Independent Test**: User fills the form on `index.html`. If credentials match, they are redirected.

**Acceptance Scenarios**:

1. **Given** valid email/password credentials, **When** the user clicks "Entrar no Sistema", **Then** they redirected to their specific dashboard environment.

---

### User Story 3 - Secure Page Protection (Priority: P2)

As the system administrator, I want to ensure that internal pages are only accessible to authenticated users to protect sensitive industrial data.

**Why this priority**: Security requirement to prevent unauthorized data access.

**Independent Test**: Attempt to access `dashboard.html` directly in a clean browser session. Expect redirect to `index.html`.

**Acceptance Scenarios**:

1. **Given** no active session, **When** a user navigates directly to `dashboard.html`, **Then** they are automatically redirected back to `index.html`.

---

### User Story 4 - Dynamic Backend Dispatch (Priority: P3)

As a multi-tenant client, I want my dashboard to connect to my specific server instance so that I only see my own machine telemetry.

**Why this priority**: Essential for the "server per user" requirement specified by the user.

**Independent Test**: Log in with User A (mapped to IP 1.2.3.4) and verify API calls. Log out and log in with User B (mapped to IP 5.6.7.8) and verify different API calls.

**Acceptance Scenarios**:

1. **Given** a successful login, **When** the user is redirected, **Then** the application context contains the correct Server IP for that specific user ID.

---

### User Story 5 - Baseline Security Protections (Priority: P1)

As a user and administrator, I want the login process to be protected against basic vulnerabilities so that my credentials and the system are safe.

**Why this priority**: Minimum security is essential even for prototypes to establish good practices and prevent trivial exploitation.

**Independent Test**: Verify that input fields sanitize HTML tags. Verify that passwords are treated as sensitive fields (masked). Verify that after a certain number of failed traditional login attempts, the UI displays a warning or throttles the mechanism (simulated rate limiting).

**Acceptance Scenarios**:

1. **Given** a user attempting to log in, **When** they type in the password field, **Then** the characters are masked.
2. **Given** an attacker trying to inject script tags into the username field, **When** the form is submitted, **Then** the script is sanitized or rejected.
3. **Given** multiple consecutive failed login attempts, **When** the internal threshold is reached, **Then** the system visually throttles or blocks further immediate attempts.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The login screen MUST implement the **Google Identity Services (GIS)** button as the primary interaction.
- **FR-002**: The system MUST preserve the visual style defined in `index.html`, including CSS variables and card layout.
- **FR-003**: The system MUST maintain a mapping between User IDs (emails) and Server IPs/URLs.
- **FR-004**: Upon successful login, the system MUST store the session and the assigned Server IP in `sessionStorage`.
- **FR-005**: Both `dashboard.html` and `historico.html` MUST be updated to fetch the `baseURL` from the session context instead of using a hardcoded value.
- **FR-006**: A "Logout" action MUST clear all session data and redirect to `index.html`.
- **FR-007**: All authentication functionality MUST enforce HTTPS in any deployed environment to prevent credential interception.
- **FR-008**: The login form MUST implement basic input sanitization to prevent Cross-Site Scripting (XSS).
- **FR-009**: The email/password login MUST implement a minimum client-side artificial delay or lockout after 3 consecutive failed attempts to mitigate basic brute-force attacks on the prototype.

### Key Entities

- **Session**: Temporary state containing user profile, authentication token, and active Server IP.
- **User Mapping**: A data structure (e.g., JSON object) linking emails/IDs to specific backend addresses.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of unauthenticated requests to `dashboard.html` result in a redirect to `index.html`.
- **SC-002**: Total login-to-dashboard redirection time is under 1.5 seconds on a standard connection.
- **SC-003**: The login page UI score (Visual Excellence) matches the premium aesthetic of the Tandera Tech brand.

## Assumptions

- **Mock Mapping**: For the initial implementation, the user mapping will be a local JSON dictionary until a proper backend registry is provided.
- **Google Client ID**: A placeholder Google Client ID will be used until the user provides a production one.
- **Security Context**: For this prototype, `sessionStorage` will be used for storing the token/mapping to demo the flow, but it is acknowledged that production should move sensitive tokens to `HTTP-only` cookies. The backend will eventually handle actual rate limiting, but the frontend will simulate it for now.
- **Data Fidelity**: All target server IPs expose the same API schema as defined in the current `dashboard.html`.
