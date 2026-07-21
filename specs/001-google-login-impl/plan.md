# Implementation Plan: Google Login & Redirection

**Branch**: `001-google-login-impl` | **Date**: 2026-04-13 | **Spec**: [specs/001-google-login-impl/spec.md](spec.md)
**Input**: Feature specification from `/specs/001-google-login-impl/spec.md`

## Summary

Build a secure authentication system that integrates **Google Login** via GIS alongside a traditional Email/Password fallback. Add a backend using Node.js/Express to handle credential validation against MongoDB, returning a JSON Web Token (JWT) that maps the user to their specific server IP dynamically. The frontend parses this token and configures its REST client contexts across all dashboards while protecting unauthenticated access. 

## Technical Context

**Language/Version**: JavaScript (Frontend: ES6+, Backend: Node.js 20+)
**Primary Dependencies**: HTML/CSS/VanillaJS, Backend: Express, Mongoose, Google-Auth-Library, JsonWebToken, DOMPurify
**Storage**: MongoDB (Mongoose Schema)
**Target Platform**: Web Browsers (Frontend), Node/Linux Server (Backend API)
**Project Type**: Fullstack Web Application (Frontend Template + Thin Auth API)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

*   **Google-First Identity**: PASS. Implementation uses Google Identity Services for one-tap auth.
*   **Aesthetic Continuity**: PASS. Uses the original Tandera Tech index.html layout.
*   **Premium Presentation**: PASS.
*   **Defensive Design (Tokens)**: PASS. Backend issues JWTs. Tokens managed safely.

## Project Structure

### Documentation (this feature)

```text
specs/001-google-login-impl/
├── plan.md              # This file
├── research.md          # Output of Phase 0
├── data-model.md        # DB and Model rules
├── contracts/api.md     # REST API Definition
```

### Source Code

```text
backend/
├── package.json
├── src/
│   ├── server.js          # Express entry point
│   ├── db.js              # MongoDB connection
│   ├── controllers/
│   │   └── authController.js
│   ├── models/
│   │   └── User.js
│   └── routes/
│       └── authRoutes.js

frontend/          
├── index.html         # Login page (updated)
├── dashboard.html     # (updated with dynamic baseURL)
├── historico.html     # (updated with dynamic baseURL)
```

**Structure Decision**: Option 2 (Web application) fits best because we need an isolated Backend API context to connect to MongoDB and mint secure authentication JWTs without exposing secrets to the frontend.
